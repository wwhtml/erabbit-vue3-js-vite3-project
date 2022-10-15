<script setup>
// import XtxBread from "../../components/library/xtx-bread.vue";
import GoodsItem from "./components/goods-item.vue";

import { ref, computed, watch } from "vue";
import { findBanner } from "@/api/home";
import { findTopCategory } from "@/api/category";

import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { useRoute } from "vue-router";

//轮播图数据
const sliders = ref([]);
findBanner().then((data) => {
  sliders.value = data.result;
});

//分类数据
const categoryStore = useCategoryStore();
const { list } = storeToRefs(categoryStore);
console.log(list);

//路由
const route = useRoute();

const topCategory = computed(() => {
  let cate = {};
  const item = list.value.find((item) => {
    return item.id === route.params.id;
  });
  if (item) cate = item;
  return cate;
});
console.log(topCategory);

//商品分类信息
const subList = ref([]);
const getSubList = () => {
  findTopCategory(route.params.id).then((data) => {
    subList.value = data.result.children;
  });
};
watch(
  () => route.params.id,
  (newVal) => {
    newVal && getSubList();
  },
  { immediate: true }
);
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 （全局注册面包屑组件）-->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮包图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联的商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
