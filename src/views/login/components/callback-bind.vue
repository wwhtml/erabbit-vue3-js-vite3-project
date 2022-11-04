<script setup>
import { ref, reactive, onUnmounted } from "vue";

import schema from "@/utils/vee-validate-schema";
import { Form, Field } from "vee-validate";
import Message from "@/components/library/Message";

import { useIntervalFn } from "@vueuse/core";

import { userQQBindCode, userQQBindLogin } from "@/api/user";

import { useUserStore } from "@/stores/user.js";

const props = defineProps({
  unionId: {
    type: String,
    default: "",
  },
});

//获取QQ登录用信息（当前组件需要使用登录用户的头像信息/昵称信息）
const nickname = ref("null");
const avatar = ref("null");
if (QC.Login.check()) {
  QC.api("get_user_info").success((res) => {
    avatar.value = res.data.figureurl_qq_1;
    nickname.value = res.data.nickname;
  });
}

//首先处理一下表单
// 表单数据对象
const form = reactive({
  mobile: null,
  code: null,
});
// 校验规则对象
const mySchema = {
  mobile: schema.mobile,
  code: schema.code,
};
// 发送短信验证码
// pause 暂停 resume 开始
// useIntervalFn(回调函数,执行间隔,是否立即开启)
const formCom = ref(null);
const time = ref(0);
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (time.value <= 0) {
      pause();
    }
  },
  1000,
  false
);
onUnmounted(() => {
  pause();
});
const send = async () => {
  const valid = mySchema.mobile(form.mobile);
  if (valid === true) {
    // 通过
    if (time.value === 0) {
      // 没有倒计时才可以发送
      await userQQBindCode(form.mobile);
      Message({ type: "success", text: "发送成功" });
      time.value = 60;
      resume();
    }
  } else {
    // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
    formCom.value.setFieldError("mobile", valid);
  }
};

//如果已经有了小兔鲜账号那么绑定账号
const userStore = useUserStore();
const submit = async () => {
  const valid = formCom.value.validate();
  if (valid) {
    userQQBindLogin({
      unionId: props.unionId,
      ...form,
    })
      .then((data) => {
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
      })
      .catch((e) => {
        Message({ type: "error", text: "绑定失败" });
      });
  }
};
</script>

<template>
  <Form
    ref="formCom"
    :validation-schema="mySchema"
    v-slot="{ errors }"
    autocomplete="off"
    class="xtx-form"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          :class="{ err: errors.mobile }"
          v-model="form.mobile"
          name="mobile"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          :class="{ err: errors.code }"
          v-model="form.code"
          name="code"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span @click="send()" class="code">
          {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
        </span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
