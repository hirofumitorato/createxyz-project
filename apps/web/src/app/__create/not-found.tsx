import React, { useCallback, useEffect, useState } from 'react';
import fg from 'fast-glob';
import type { LoaderFunctionArgs } from 'react-router';
import { useNavigate } from 'react-router';

// --- Loader: APIっぽいJSON相当の“プレーンオブジェクト”を返す ---
export async function loader({ params }: LoaderFunctionArgs) {
  const matches = await fg('src/**/page.{js,jsx,ts,tsx}');

  const data = {
    path: `/${params['*'] ?? ''}`,
    pages: matches
      .sort((a, b) => a.length - b.length)
      .map((match) => {
        const url =
          match.replace('src/app', '').replace(/\/page\.(js|jsx|ts|tsx)$/, '') || '/';
        const path = url.replaceAll('[', '').replaceAll(']', '');
        const displayPath = path === '/' ? 'Homepage' : path;
        return { url, path: displayPath };
      }),
  };

  // React Router はシリアライズ可能な値ならそのまま扱えます（Response不要）
  return data;
}

interface ParentSitemap {
  webPages?: Array<{
    id: string;
    name: string;
    filePath: string;
    cleanRoute?: string;
  }>;
}

export default function CreateDefaultNotFoundPage({
  loaderData,
}: {
  loaderData: Awaited<ReturnType<typeof loader>>;
}) {
  const [siteMap, setSitemap] = useState<ParentSitemap | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
      const handler = (event: MessageEvent) => {
        if ((event.data as any)?.type === 'sandbox:sitemap') {
          window.removeEventListener('message', handler);
          setSitemap((event.data as any).sitemap as ParentSitemap);
        }
      };

      window.parent.postMessage({ type: 'sandbox:sitemap' }, '*');
      window.addEventListener('message', handler);

      return () => {
        window.removeEventListener('message', handler);
      };
    }
  }, []);

  const missingPath = loaderData.path.replace(/^\//, '');
  const existingRoutes = loaderData.pages.map((page) => ({
    path: page.path,
    url: page.url,
  }));

  const handleBack = () => navigate('/');

  const handleSearch = (value: string) => {
    if (!siteMap) {
      navigate(`/${value}`);
    } else {
      navigate(value);
    }
  };

  const handleCreatePage = useCallback(() => {
    window.parent.postMessage(
      {
        type: 'sandbox:web:create',
        path: missingPath,
        view: 'web',
      },
      '*'
    );
  }, [missingPath]);

  return (
    <div className="flex sm:w-full w-screen sm:min-w-[850px] flex-col">
      {/* 必要に応じて、元の JSX をここに戻してください */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Uh-oh! This page doesn't exist (yet).</h1>
        <p className="text-gray-600 mt-2">
          Missing: <code>/{missingPath}</code>
        </p>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={handleBack}
            className="px-3 py-2 rounded-md border border-gray-300"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={() => handleCreatePage()}
            className="px-3 py-2 rounded-md bg-black text-white"
          >
            Create Page
          </button>
        </div>

        <div className="mt-8">
          <h2 className="font-medium mb-2">Existing routes</h2>
          <div className="flex flex-wrap gap-2">
            {existingRoutes.map((route) => (
              <button
                key={route.path}
                type="button"
                onClick={() => handleSearch(route.url.replace(/^\//, ''))}
                className="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50"
              >
                {route.path}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
