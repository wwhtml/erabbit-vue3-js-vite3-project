<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  to: {
    type: [String, Object],
  },
});
</script>

<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
