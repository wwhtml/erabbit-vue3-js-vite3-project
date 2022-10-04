import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: "8889",
  },
  css: {
    preprocessorOptions: {
      less: {
        // javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          "src/assets/styles/config.less"
        )}";`,
      },
    },
  },
});
