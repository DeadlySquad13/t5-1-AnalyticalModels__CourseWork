import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const BASE_URL = import.meta.env.VITE_BASE_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_URL,
  plugins: [react({
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
        targets: ['IE 8'],
    })
  ],
})
