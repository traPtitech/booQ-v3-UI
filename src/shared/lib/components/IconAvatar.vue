<script setup lang="ts">
import { computed } from 'vue';
import Avatar from 'primevue/avatar';
const props = defineProps<{
  name: string;
  pixel: number;
}>();

const size = computed(() => `${props.pixel}px`);
</script>
<template>
  <Avatar
    :image="`https://q.trap.jp/api/v3/public/icon/` + name"
    shape="circle"
    :class="[$style['icon-avator'], 'rounded-full']"
  />
</template>

<style lang="postcss" module>
.icon-avator {
  width: v-bind(size);
  height: v-bind(size);
}
</style>
