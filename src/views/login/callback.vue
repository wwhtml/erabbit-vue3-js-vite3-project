<script setup>
import LoginHeader from "./components/login-header.vue";
import LoginFooter from "./components/login-footer.vue";

import CallbackBind from "./components/callback-bind.vue";
import CallbackPatch from "./components/callback-patch.vue";

import { ref } from "vue";
import { userQQLogin } from "@/api/user";

import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";

//如果，QQ用户登录成功，获取qq用户信息

// if (QC.Login.check()) {
//   console.log(QC.Login.check()); //判断QQ是否登录（true/false）
//   console.log(QC.Login.getMe()); //函数参数是一个函数，它的参数有两个：openId, accessToken
//   console.log(QC);
//   console.log(QC.api);
//   // console.dir(QC.api);
//   QC.api("get_user_info").success((res) => {
//     console.log(res); //包含了QQ用户的基本信息，比如头像、昵称、城市、年龄QQ账户填写的基本信息
//   });

//   QC.Login.getMe((openId, accessToken) => {
//     console.log(openId); //"223DE8B1CF1177384E9F30F84F34390A"
//     console.log(accessToken); //"89A7C5D5BBFB744D1D4ABE177899CE39"
//   });
// }

const hasAccount = ref(true);
const unionId = ref(null);
const isBind = ref(true);

const router = useRouter();
const userStore = useUserStore();

console.log(userStore);
console.log(userStore.redirectUrl);

// 确保QQ已经登录
if (QC.Login.check()) {
  // 第三方唯一标识QQ唯一标识
  QC.Login.getMe((openId) => {
    unionId.value = openId;
    // 请求小兔鲜后台，做QQ登录
    //如果当前QQ用户绑定了小兔鲜账号，就会获取数据，如果没有绑定，就会要求进行绑定
    userQQLogin(openId)
      .then((data) => {
        //把登录的QQ的唯一标识，传给网站qq登录接口，返回数据
        console.log(data);
        const { id, account, avatar, mobile, nickname, token } = data.result;
        userStore.setUser({
          id,
          account,
          avatar,
          mobile,
          nickname,
          token,
        });
        router.push(userStore.redirectUrl);
      })
      .catch((e) => {
        // 登录失败：没有和小兔鲜绑定
        isBind.value = false;
      });
  });
}
</script>

<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
