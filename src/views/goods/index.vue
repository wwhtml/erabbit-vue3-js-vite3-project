<script setup>
import { ref, watch, nextTick, provide } from "vue";
import { useRoute } from "vue-router";
import { findGoods } from "../../api/product";

import GoodsImage from "./components/goods-image.vue";

const useGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          goods.value = null;
          // nextTick(() => {
          goods.value = data.result;
          // });
        });
      }
    },
    { immediate: true }
  );
  return goods;
};

const goods = useGoods();
// console.log(goods);
// provide("goods", goods);
</script>

<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      11
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
        </div>
        <div class="spec"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background-color: #fff;
  display: flex;
  .media {
    width: 500px;
    height: 400px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
