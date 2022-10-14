import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

const ENV = import.meta.env;
console.log(ENV);
//注意：在vite.config.js中无法使用`import.meta.env`,需要通过 loadEnv 使用如下方法调用

// https://vitejs.dev/config/
export default ({ mode }) => {
  const ENV1 = loadEnv(mode, process.cwd());
  console.log(ENV1);
  console.log(`/^${ENV1.VITE_APP_FLAG}/`);

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: "8889",
      proxy: {
        [ENV1.VITE_APP_FLAG]: {
          target: ENV1.VITE_APP_APIURL,
          ws: false, // webstock
          changeOrigin: true, // 是否开启跨域
          // rewrite: (path) => path.replace(/^\/api/, ""),
          rewrite: (path) =>
            path.replace(new RegExp("^" + ENV1.VITE_APP_FLAG), ""),
        },
      },

      // proxy: {//baseURL="/api"
      //   "/api": {
      //     target: "https://apipc-xiaotuxian-front.itheima.net",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
      // },
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
};
