//<reference types="vite/client" />

interface ImportMeta {
    readonly hot?: {
      on: (event: string, cb: (...args: any[]) => void) => void;
      off: (event: string, cb: (...args: any[]) => void) => void;
    };
    readonly env: ImportMetaEnv;
  }
  
  interface ImportMetaEnv {
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly NEXT_PUBLIC_API_URL?: string;
  }
  