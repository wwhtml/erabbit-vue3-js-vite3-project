// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// import XtxSkeleton from "./xtx-skeleton.vue";
// import XtxCarousel from "./xtx-carousel.vue";
// import XtxMore from "./xtx-more.vue";
// import XtxBread from "./xtx-bread.vue";
// import XtxBreadItem from "./xtx-bread-item.vue";

import defaultImg from "../../assets/images/200.png";

const importFn = import.meta.globEager("./*.vue");
// console.log(importFn);

//转换文件名格式
var transform = function (str) {
  let arr = str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
  }
  return arr.join("");
};

// 插件可以是一个带 install() 方法的对象，亦或直接是一个将被用作 install() 方法的函数。插件选项 (app.use() 的第二个参数) 将会传递给插件的 install() 方法。
export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component("XtxSkeleton", XtxSkeleton);
    // app.component("XtxCarousel", XtxCarousel);
    // app.component("XtxMore", XtxMore);
    // app.component("XtxBread", XtxBread);
    // app.component("XtxBreadItem", XtxBreadItem);

    // 批量注册全局组件
    Object.keys(importFn).forEach((key) => {
      // 导入组件
      const component = importFn[key].default;
      // console.log(component);
      // 注册组件
      //setup语法糖组件的name属性默认是vue文件名
      app.component(transform(component.__name), component);
    });
    defineDirective(app);
  },
};

// 定义指令
const defineDirective = (app) => {
  // 1. 图片懒加载指令 v-lazy
  // 原理：先存储图片地址不能在src上，当图片进入可视区，将你存储图片地址设置给图片元素即可。
  app.directive("lazy", {
    // vue2.0 监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样，使用指令的DOM是否创建好，钩子函数：mounted
    mounted(el, binding) {
      el.src = defaultImg;

      // 2. 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止观察
            observe.unobserve(el);
            // 3. 把指令的值设置给el的src属性 binding.value就是指令的值
            // 4. 处理图片加载失败 error 图片加载失败的事件 load 图片加载成功
            el.onerror = () => {
              // 加载失败，设置默认图
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        {
          threshold: 0,
        }
      );
      // 开启观察
      observe.observe(el);
    },
  });
};
