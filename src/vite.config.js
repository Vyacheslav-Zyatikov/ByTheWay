import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
        }),
        react(),
    ],
    server: {
       host: true,
       port: 3000,
       open: false,
       cors: false,
       hmr: {
            host: '77.37.192.93',
		    overlay: true,
        },
    },
});