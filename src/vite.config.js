import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl"

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/*",
        }),
        basicSsl(),
        react(),
    ],
    resolve: {
      alias: {
        "@": "/resources/js",
      },
    },
});