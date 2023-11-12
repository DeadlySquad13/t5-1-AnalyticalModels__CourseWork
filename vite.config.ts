import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
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
