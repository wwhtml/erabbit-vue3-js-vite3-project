import { h, render } from "vue";
import XtxMessage from "./xtx-message.vue";

// DOM容器
const div = document.createElement("div");
div.setAttribute("class", "xtx-msssage-container");
document.body.appendChild(div);

// 定时器标识
let timer = null;

export default ({ type, text }) => {
  // 渲染组件
  // 1. 导入消息提示组件
  // 2. 将消息提示组件编译为虚拟节点(dom节点)
  // createVNode(组件,属性对象（props）)
  const vnode = h(XtxMessage, { type, text });
  // 3. 准备一个装载消息提示组件的DOM容器
  // 4. 将虚拟节点渲染再容器中
  // render(虚拟节点,DOM容器)
  render(vnode, div); //将虚拟节点渲染到div中
  // 5. 3s后销毁组件
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 3000);
};
