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
    class="rounded-full"
    :style="{ width: size, height: size }"
  />
</template>
