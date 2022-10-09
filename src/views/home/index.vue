<script setup>
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
import HomeBrand from "./components/home-brand.vue";
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory></HomeCategory>
        <!-- 轮播图 -->
        <HomeBanner></HomeBanner>
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气推荐 -->
    <HomeHot></HomeHot>
    <!-- 热门品牌 -->
    <HomeBrand></HomeBrand>
  </div>
</template>

<style scoped lang="less"></style>
