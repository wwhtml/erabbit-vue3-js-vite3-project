import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "normalize.css";
import "@/assets/styles/common.less";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import ui from "./components/library";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(router).use(ui).mount("#app");
