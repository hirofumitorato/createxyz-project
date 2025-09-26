import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

// Get current directory
const __dirname = join(fileURLToPath(new URL('.', import.meta.url)), '../src/app/api');
if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Recursively find all route.js files
async function findRouteFiles(dir: string): Promise<string[]> {
  const files = await readdir(dir);
  let routes: string[] = [];

  for (const file of files) {
    try {
      const filePath = join(dir, file);
      const statResult = await stat(filePath);

      if (statResult.isDirectory()) {
        routes = routes.concat(await findRouteFiles(filePath));
      } else if (file === 'route.js') {
        // Handle root route.js specially
        if (filePath === join(__dirname, 'route.js')) {
          routes.unshift(filePath); // Add to beginning of array
        } else {
          routes.push(filePath);
        }
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  return routes;
}

// Transform path segments (supports [id], [...slug]) into Hono patterns
function transformSegmentsToHonoParts(routeParts: string[]): { name: string; pattern: string }[] {
  if (routeParts.length === 0) {
    return [{ name: 'root', pattern: '' }];
  }
  return routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
}

// Helper function to transform absolute file path (dev) to Hono route path
function getHonoPathFromAbsolute(routeFile: string): { name: string; pattern: string }[] {
  const relativePath = routeFile.replace(__dirname, '');
  const parts = relativePath.split('/').filter(Boolean);
  const routeParts = parts.slice(0, -1); // Remove 'route.js'
  return transformSegmentsToHonoParts(routeParts);
}

// Import and register all routes
async function registerRoutes() {
  // Check if API directory exists before scanning
  if (!existsSync(__dirname)) {
    console.warn(`API route directory missing: ${__dirname}. Skip registerRoutes.`);
    return;
  }

  // Clear existing routes
  api.routes = [];

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

  if (import.meta.env.DEV) {
    // In development, keep using filesystem to enable hot-reload easily
    const routeFiles = (
      await findRouteFiles(__dirname).catch((error) => {
        console.error('Error finding route files:', error);
        return [] as string[];
      })
    )
      .slice()
      .sort((a, b) => b.length - a.length);

    for (const routeFile of routeFiles) {
      try {
        const route = await import(/* @vite-ignore */ `${routeFile}?update=${Date.now()}`);
        for (const method of methods) {
          try {
            if ((route as any)[method]) {
              const parts = getHonoPathFromAbsolute(routeFile);
              const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
              const handler: Handler = async (c) => {
                const params = c.req.param();
                const updatedRoute = await import(
                  /* @vite-ignore */ `${routeFile}?update=${Date.now()}`
                );
                return await (updatedRoute as any)[method](c.req.raw, { params });
              };
              switch (method) {
                case 'GET':
                  api.get(honoPath, handler);
                  break;
                case 'POST':
                  api.post(honoPath, handler);
                  break;
                case 'PUT':
                  api.put(honoPath, handler);
                  break;
                case 'DELETE':
                  api.delete(honoPath, handler);
                  break;
                case 'PATCH':
                  api.patch(honoPath, handler);
                  break;
              }
            }
          } catch (error) {
            console.error(`Error registering route ${routeFile} for method ${method}:`, error);
          }
        }
      } catch (error) {
        console.error(`Error importing route file ${routeFile}:`, error);
      }
    }
    return;
  }

  // In production, avoid runtime filesystem access. Use import.meta.glob at build time.
  const routeModules = import.meta.glob('../src/app/api/**/route.js', { eager: true });
  const moduleEntries = Object.entries(routeModules)
    .map(([key, mod]) => ({ key, mod }))
    .sort((a, b) => b.key.length - a.key.length);

  for (const { key, mod } of moduleEntries) {
    try {
      const relativePath = key.replace('../src/app/api', '');
      const parts = relativePath.split('/').filter(Boolean);
      const routeParts = parts.slice(0, -1); // drop route.js
      const transformed = transformSegmentsToHonoParts(routeParts);
      const honoPath = `/${transformed.map(({ pattern }) => pattern).join('/')}`;
      for (const method of methods) {
        try {
          // @ts-ignore
          if ((mod as any)[method]) {
            const handler: Handler = async (c) => {
              const params = c.req.param();
              return await (mod as any)[method](c.req.raw, { params });
            };
            switch (method) {
              case 'GET':
                api.get(honoPath, handler);
                break;
              case 'POST':
                api.post(honoPath, handler);
                break;
              case 'PUT':
                api.put(honoPath, handler);
                break;
              case 'DELETE':
                api.delete(honoPath, handler);
                break;
              case 'PATCH':
                api.patch(honoPath, handler);
                break;
            }
          }
        } catch (error) {
          console.error(`Error registering route ${key} for method ${method}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error importing route module ${key}:`, error);
    }
  }
}

// Initial route registration
(async () => {
  await registerRoutes();
})();

// Hot reload routes in development
if (import.meta.env.DEV) {
  import.meta.glob('../src/app/api/**/route.js', {
    eager: true,
  });
  if (import.meta.hot) {
    import.meta.hot.accept((newSelf) => {
      registerRoutes().catch((err) => {
        console.error('Error reloading routes:', err);
      });
    });
  }
}

export { api, API_BASENAME };
