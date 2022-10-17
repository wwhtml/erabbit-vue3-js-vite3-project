import { createRouter, createWebHashHistory } from "vue-router";

//注意：在vite中不要省略扩展名，否则会报错，如果想要沈略，需要在vite.config.js设置（不提倡）

// import Layout from "../views/Layout.vue";
const Layout = () => import("@/views/Layout.vue");
const Home = () => import("@/views/home/index.vue");
const TopCategory = () => import("@/views/category/index.vue");
const SubCategory = () => import("@/views/category/sub.vue");
const Goods = () => import("@/views/goods/index.vue");

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      { path: "/", component: Home },
      { path: "/category/:id", component: TopCategory },
      { path: "/category/sub/:id", component: SubCategory },
      { path: "/product/:id", component: Goods },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
