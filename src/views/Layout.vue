<script setup>
import { RouterView } from "vue-router";
import AppTopNav from "@/components/app-top-nav.vue";
import AppHeader from "@/components/app-header.vue";
import AppFooter from "@/components/app-footer.vue";

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
  <!-- app-top-nav.vue -->
  <AppTopNav></AppTopNav>
  <!-- app-header -->
  <AppHeader></AppHeader>
  <main>
    <RouterView />
  </main>
  <!-- app-footer -->
  <AppFooter></AppFooter>
</template>

<style scoped lang="less">
nav {
  color: @xtxColor;
}
</style>
