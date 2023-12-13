/// <reference types="vite/client" />

interface ImportMetaEnv {
    //   For setting base url based on server environment in vite.config.ts.
    //
    //   If you want to use it in code, better reference
    // import.meta.env.BASE_URL which is automatically populated from
    // vite.config.ts base config option.
    readonly VITE_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
