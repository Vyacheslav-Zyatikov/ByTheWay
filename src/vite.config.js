import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
        }),
        react()
    ],
    resolve: {
      alias: {
        "@": "/resources/js",
      },
    },
    server: {
      host: true,
      port: 3000,
      open: false,
      cors: true,
      hmr: {
        // host: '77.37.192.93',
        host: "127.0.0.1",
        overlay: true,
      },
    },
});
