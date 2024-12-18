<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  pixel: number;
}>();

const size = computed(() => `${props.pixel}px`);
</script>
<template>
  <img
    :src="`https://q.trap.jp/api/v3/public/icon/` + name"
    :width="pixel"
    :height="pixel"
  />
</template>

<style lang="scss" scoped>
img {
  border-radius: 50%;
  width: v-bind(size);
  height: v-bind(size);
}
</style>
