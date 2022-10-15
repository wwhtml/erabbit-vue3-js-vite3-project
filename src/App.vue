<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<!-- 测试 -->
<!-- <script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";
import { useCartStore } from "./stores/cart";
const userStore = useUserStore();
const cartStore = useCartStore();

const setUser = () => {
  userStore.setUser({ account: "1" });
  cartStore.addCart();
};
</script>

<template>
  {{ userStore.profile }}
  <button @click="setUser">setUser</button>
</template> -->
