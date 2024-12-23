<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  placeholder: string;
  size: number;
}>();
</script>

<template>
  <input
    type="text"
    class="text-input"
    :size="props.size"
    :placeholder="props.placeholder"
  />
</template>
<style lang="scss" scoped>
.text-input {
  height: 24px;
  border-radius: 4px;
  border-color: $color-border;
  border: 1px solid;
}
.text-input::placeholder {
  font-size: 16px;
  font-weight: 500;
  color: $color-text-placeholder;
}
</style>
