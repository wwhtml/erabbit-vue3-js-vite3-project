import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      //购物车数据集合
      // cart: {
      list: [{ id: 1 }],
      // },
    };
  },
  // persist: true,

  persist: {
    key: "errabit-cart",
    path: ["cart"],
  },
  // persist: {
  //   storage: sessionStorage,
  //   paths: ["count"],
  // },

  actions: {
    addCart() {
      this.list = [{ id: 2 }];
    },
  },
});
