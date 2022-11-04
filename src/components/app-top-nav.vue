<script setup>
//获取vuex中的user信息，查看是否已经登陆
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
console.log(userStore);
//toRaw:将响应式对象转换为普通对象
// console.log(toRaw(userStore));
const { profile } = userStore;

//退出登录功能
const router = useRouter();
const logout = () => {
  userStore.setUser({});
  QC.Login.signOut();
  router.push("/login");
};
</script>

<template>
  <nav class="app-top-nav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a><i class="iconfont icon-user"></i>{{ profile.account }}</a>
          </li>

          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>

        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>

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
