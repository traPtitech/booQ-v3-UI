<script setup lang="ts">
import { computed } from 'vue';
import Avatar from 'primevue/avatar';
const props = defineProps<{
  name: string;
  pixel: number;
}>();

const size = computed(() => `${props.pixel}px`);
const avatarDesignTokens = computed(() => ({
  root: {
    width: size.value,
    height: size.value,
  },
}));
</script>
<template>
  <Avatar
    :image="`https://q.trap.jp/api/v3/public/icon/` + name"
    :dt="avatarDesignTokens"
    shape="circle"
    :class="[$style['icon-avatar'], 'rounded-full']"
  />
</template>

<style module>
.icon-avatar {
  flex-shrink: 0;
  overflow: hidden;
}

.icon-avatar :global(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
