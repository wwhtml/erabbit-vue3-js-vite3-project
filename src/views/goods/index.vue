<script setup>
import { ref, watch, nextTick, provide } from "vue";
import { useRoute } from "vue-router";
import { findGoods } from "../../api/product";

import GoodsImage from "./components/goods-image.vue";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsRelevant from "./components/goods-relevant.vue";
import GoodsTabs from "./components/goods-tabs.vue";
import GoodsWarn from "./components/goods-warn.vue";
import GoodsHot from "./components/goods-hot.vue";

const useGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          goods.value = null;
          nextTick(() => {
            goods.value = data.result;
          });
        });
      }
    },
    { immediate: true }
  );
  return goods;
};

const goods = useGoods();
// console.log(goods);
provide("goods", goods);

const changeSku = (sku) => {
  // 修改商品的现价原价库存信息
  if (sku.skuId) {
    goods.value.price = sku.price;
    goods.value.oldPrice = sku.oldPrice;
    goods.value.inventory = sku.inventory;
  }
};
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
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- sku组件 skuId="1369155865461919746" 测试选中 -->
          <GoodsSku :goods="goods" @change="changeSku" />
        </div>
      </div>

      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24小时热榜+周热销榜 -->
        <div class="goods-aside">
          <!-- 24热榜+周热销榜 -->
          <div class="goods-aside">
            <GoodsHot />
            <GoodsHot :type="2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
// .goods-warn {
//   min-height: 600px;
//   background: #fff;
//   margin-top: 20px;
// }
</style>
