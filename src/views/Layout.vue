<script setup>
import { RouterView } from "vue-router";
import AppTopNav from "@/components/app-top-nav.vue";
</script>

<template>
  <!-- app-top-nav.vue -->
  <AppTopNav></AppTopNav>
  <header>header</header>
  <main>
    <RouterView />
  </main>
  <footer>footer</footer>
</template>

<style scoped lang="less">
nav {
  color: @xtxColor;
}
</style>
