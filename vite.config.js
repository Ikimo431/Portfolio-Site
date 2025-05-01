import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: '/Portfolio-Site/',  
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            projects: resolve(__dirname, 'projects.html')
          }
        }
    }
});