<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  parentName: {
    type: String,
    default: "",
  },
  parentPath: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="xtx-bread">
    <div class="xtx-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>

    <div class="xtx-bread-item" v-if="parentName">
      <RouterLink v-if="parentPath" :to="parentPath">
        {{ parentName }}
      </RouterLink>
      <span v-else>{{ parentName }}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item">
      <span><slot /></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
