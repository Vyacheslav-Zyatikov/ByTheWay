import { fileURLToPath, URL } from "node:url";
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
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./resources/js/", import.meta.url)),
        },
        {
          find: "~",
          replacement: fileURLToPath(new URL("./resources/css/", import.meta.url)),
        },
      ],
    },
    /* server: {
       host: true,
       port: 3000,
       open: false,
       cors: true,
       https: true,
       proxy: {
            '^(?!(\/\@vite|\/resources|\/node_modules))': {
                target: `http://77.37.192.93:3000`,
            }
        },
       hmr: {
            host: '77.37.192.93',
		    overlay: true,
        },
    }, */
});