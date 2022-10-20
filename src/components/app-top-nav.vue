<script setup>
//获取vuex中的user信息，查看是否已经登陆

import { toRaw } from "vue";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
console.log(userStore);
//toRaw:将响应式对象转换为普通对象
// console.log(toRaw(userStore));

const { profile } = userStore;
</script>

<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <li v-if="profile.token"><a href="javascript:;">退出登录</a></li>
        <li v-else><a href="javascript:;">请先登录</a></li>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-top-nav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
