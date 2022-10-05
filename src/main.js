import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//样式初始化
import "normalize.css";
//通用样式
import "@/assets/styles/common.less";

//pinia持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

//全局组件
import ui from "./components/library";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(router).use(ui).mount("#app");
