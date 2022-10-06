<script setup>
import { RouterView } from "vue-router";
import AppTopNav from "@/components/app-top-nav.vue";
import AppHeader from "@/components/app-header.vue";
import AppFooter from "@/components/app-footer.vue";
import AppHeaderSticky from "@/components/app-header-sticky.vue";

import { nextTick } from "vue";

//引入categoryStore
import { useCategoryStore } from "../stores/category";

//使用categoryStroe,获取后端分类信息
const categoryStore = useCategoryStore();
nextTick(() => {
  categoryStore.getList();
});
</script>

<template>
  <!-- 顶部通栏 -->
  <AppTopNav></AppTopNav>
  <!-- 头部组件 -->
  <AppHeader></AppHeader>
  <!-- 吸顶头部 -->
  <AppHeaderSticky></AppHeaderSticky>

  <!-- 主体内容 -->
  <main class="app-body">
    <!-- 二级路由 -->
    <RouterView />
  </main>
  <!-- 底部组件 -->
  <AppFooter></AppFooter>
</template>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
