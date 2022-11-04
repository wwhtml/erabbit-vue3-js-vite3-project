import { defineStore } from "pinia";

//第一个参数 UserStore ，是一个id这必须是唯一的，不能与其他的创建的store的id重复
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      // user: {
      profile: {
        id: "1111",
        avatar: "",
        nickname: "",
        account: "",
        mobile: "",
        token: "",
      },
      // 登录后回跳路径
      redirectUrl: "/",
      // },
    };
  },
  // persist: true,
  persist: {
    key: "errabit-user",
    path: ["user"],
  },

  actions: {
    setUser(payload) {
      this.profile = payload;
    },
    // 修改回跳地址
    setRedirectUrl(url) {
      this.redirectUrl = url;
    },
  },
});
