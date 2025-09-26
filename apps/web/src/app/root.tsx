import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  Component,
} from 'react';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { useAsyncError, useRouteError } from 'react-router';
import { useButton } from '@react-aria/button';
import './global.css';

import fetch from '../__create/fetch';
// @ts-ignore
import { SessionProvider } from '@auth/create/react';
import { serializeError } from 'serialize-error';
import { Toaster } from 'sonner';
// @ts-ignore
import { LoadFonts } from 'virtual:load-fonts.jsx';
import { HotReloadIndicator } from '../__create/HotReload';
import { useSandboxStore } from '../__create/hmr-sandbox-store';
// import type { Route } from './+types/root'; // ← 削除
import { useDevServerHeartbeat } from '../__create/useDevServerHeartbeat';

export const links = () => [];

// fetch をグローバルに上書き
if (typeof window !== 'undefined') {
  window.fetch = fetch;
}

function SharedErrorBoundary({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children?: ReactNode;
}): React.ReactElement {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 max-w-md w-full mx-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center">
              <span className="text-black text-[1.125rem] leading-none">⚠</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <p className="font-light text-[#F2F2F2] text-sm">App Error Detected</p>
            <p className="text-[#959697] text-sm font-light">
              It looks like an error occurred while trying to use your app.
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================
// Error Boundaries
// ==========================
export function ErrorBoundary({ error }: { error?: unknown }) {
  return <SharedErrorBoundary isOpen={true} />;
}

function InternalErrorBoundary({ error: errorArg }: { error?: unknown }) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);

  const { buttonProps: showLogsButtonProps } = useButton(
    {
      onPress: useCallback(() => {
        window.parent.postMessage({ type: 'sandbox:web:show-logs' }, '*');
      }, []),
    },
    useRef<HTMLButtonElement>(null)
  );

  const { buttonProps: fixButtonProps } = useButton(
    {
      onPress: useCallback(() => {
        window.parent.postMessage(
          { type: 'sandbox:web:fix', error: serializeError(error) },
          '*'
        );
        setIsOpen(false);
      }, [error]),
      isDisabled: !error,
    },
    useRef<HTMLButtonElement>(null)
  );

  const { buttonProps: copyButtonProps } = useButton(
    {
      onPress: useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      }, [error]),
    },
    useRef<HTMLButtonElement>(null)
  );

  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }

  return (
    <SharedErrorBoundary isOpen={isOpen}>
      {isInIframe() ? (
        <div className="flex gap-2">
          {!!error && (
            <button type="button" {...fixButtonProps}>
              Try to fix
            </button>
          )}
          <button type="button" {...showLogsButtonProps}>
            Show logs
          </button>
        </div>
      ) : (
        <button type="button" {...copyButtonProps}>
          Copy error
        </button>
      )}
    </SharedErrorBoundary>
  );
}

// ==========================
// ErrorBoundary Wrapper
// ==========================
type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean; error: unknown | null };

class ErrorBoundaryWrapper extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <InternalErrorBoundary error={this.state.error} />;
    }
    return this.props.children;
  }
}

// ==========================
// ClientOnly
// ==========================
export const ClientOnly: React.FC<{ loader: () => React.ReactNode }> = ({ loader }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <ErrorBoundaryWrapper>
      <>{loader()}</>
    </ErrorBoundaryWrapper>
  );
};

// ==========================
// HMR
// ==========================
export function useHmrConnection(): boolean {
  const [connected, setConnected] = useState(() => !!import.meta.hot);
  useEffect(() => {
    if (!import.meta.hot) return;
    const onDisconnect = () => setConnected(false);
    const onConnect = () => setConnected(true);
    import.meta.hot.on('vite:ws:disconnect', onDisconnect);
    import.meta.hot.on('vite:ws:connect', onConnect);
    const onFullReload = () => setConnected(false);
    import.meta.hot.on('vite:beforeFullReload', onFullReload);
    return () => {
      import.meta.hot?.off('vite:ws:disconnect', onDisconnect);
      import.meta.hot?.off('vite:ws:connect', onConnect);
      import.meta.hot?.off('vite:beforeFullReload', onFullReload);
    };
  }, []);
  return connected;
}

// ==========================
// Layout
// ==========================
export function Layout({ children }: { children: ReactNode }) {
  if (import.meta.env.DEV) useDevServerHeartbeat();

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sandbox:navigation') {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'sandbox:web:ready' }, '*');
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({ type: 'sandbox:web:navigation', pathname }, '*');
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script type="module" src="/src/__create/dev-error-overlay.js"></script>
        <link rel="icon" href="/src/__create/favicon.png" />
        <LoadFonts />
      </head>
      <body>
        <ClientOnly loader={() => children} />
        <HotReloadIndicator />
        <Toaster position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
}
