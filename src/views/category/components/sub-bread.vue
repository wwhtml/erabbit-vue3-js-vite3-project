<script setup>
//获取路由信息
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";
import { computed, nextTick } from "vue";

const route = useRoute();
const category = useCategoryStore();
const { list } = storeToRefs(category);

console.log(category.list);

const cateBread = computed(() => {
  const obj = {};
  list.value.forEach((top) => {
    top.children &&
      top.children.forEach((sub) => {
        if (sub.id === route.params.id) {
          // 设置二级类目
          obj.sub = { id: sub.id, name: sub.name };
          // 设置一级类目
          obj.top = { id: top.id, name: top.name };
        }
      });
  });
  return obj;
});

//获取store信息
</script>

<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="cateBread.top" :to="`/category/${cateBread.top.id}`">
      {{ cateBread.top.name }}
    </XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem v-if="cateBread.sub" :key="cateBread.sub.id">
        {{ cateBread.sub.name }}
      </XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<style scoped></style>
