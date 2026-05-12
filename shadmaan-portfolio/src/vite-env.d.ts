/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RESUME_VARIANT?: 'fullstack' | 'powerplatform';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
