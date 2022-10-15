import { defineStore } from "pinia";
// 存储的分类数据
import { topCategory } from "@/api/constants";
import { findAllCategory } from "@/api/category";

//创建categoryStore
export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      //分类信息集合
      // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map((item) => ({ name: item })),
    };
  },

  actions: {
    setCategory(headCategory) {
      this.list = headCategory;
    },

    async getList() {
      const { result } = await findAllCategory();
      //添加open属性
      result.forEach((item) => {
        item.open = false;
      });
      // 获取数据成功
      this.setCategory(result);
    },

    //控制属性open,控制是否打开二级导航
    show(item) {
      const category = this.list.find((category) => category.id === item.id);
      category.open = true;
    },
    hide(item) {
      const category = this.list.find((category) => category.id === item.id);
      category.open = false;
    },
  },
});
