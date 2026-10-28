<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onBeforeUnmount, watch } from 'vue';
const props = withDefaults(
  defineProps<{ message: string; duration?: number }>(),
  { duration: 4000 },
);
const emit = defineEmits<{ dismiss: [] }>();
let timer: ReturnType<typeof setTimeout> | undefined;
watch(
  () => [props.message, props.duration],
  () => {
    clearTimeout(timer);
    timer = setTimeout(() => emit('dismiss'), props.duration);
  },
  { immediate: true },
);
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div :class="$style.notification" role="status">
    <Icon icon="mdi:check" :class="$style.icon" />
    <span>{{ message }}</span>
  </div>
</template>

<style module>
.notification {
  position: fixed;
  z-index: 10;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: max-content;
  max-width: calc(100% - 32px);
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  box-shadow: 0 4px 2px #00000040;
  font-size: 16px;
  text-align: left;
}
.icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
</style>
