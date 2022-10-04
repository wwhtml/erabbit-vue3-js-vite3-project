import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      //购物车数据集合
      cart: {
        list: [{ id: 1 }],
      },
    };
  },
  // persist: true,

  persist: {
    key: "userState",
    path: ["cart"],
  },
  // persist: {
  //   storage: sessionStorage,
  //   paths: ["count"],
  // },

  actions: {
    addCart() {
      this.cart.list = [{ id: 2 }];
    },
  },
});
