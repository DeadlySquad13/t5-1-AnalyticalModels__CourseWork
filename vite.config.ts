import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        base: env.VITE_BASE_URL || "./",
        plugins: [
            react({
                // babel: {
                // presets: [],
                // plugins: [],
                // Use .babelrc files.
                // babelrc: true,
                // Use babel.config.js files.
                // configFile: true,
                // }
            }),
            legacy({
                targets: ["IE 8"],
            }),
        ],
    };
});
