<script setup>
import { RouterView } from "vue-router";
import AppTopNav from "@/components/app-top-nav.vue";
import AppHeader from "@/components/app-header.vue";
import AppFooter from "@/components/app-footer.vue";
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
