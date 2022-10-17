<script setup>
import HomePanel from "./home-panel.vue";
import HomeSkeleton from "./home-skeleton.vue";

import { ref } from "vue";
import { findNew } from "@/api/home";
import { useLazyData } from "@/hooks/index.js";

const { target, result: goods } = useLazyData(findNew);
</script>

<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <div ref="target" style="position: relative; height: 406px">
        <Transition name="fade">
          <!-- 面板内容 -->
          <ul class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <!-- <RouterLink :to="`/product/${item.id}`"> -->
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazy="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
