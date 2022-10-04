import { defineStore } from "pinia";
//创建categoryStore
export const useCategoryStore = defineStore("erabbit-client-pc-store", {
  state: () => {
    return {
      //分类信息集合
      category: {
        list: [],
      },
    };
  },
});
