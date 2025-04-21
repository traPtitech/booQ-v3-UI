<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  placeholder: string;
  size: number;
}>();
</script>

<template>
  <div class="background">
    <slot name="left" />
    <input
      type="text"
      class="text-input"
      :size="props.size"
      :placeholder="props.placeholder"
    />
    <slot name="right" />
  </div>
</template>

<style lang="scss" scoped>
.background {
  display: inline flex;
  gap: 8px;
  height: 32px;
  align-items: center;
  padding: 8px 16px;
  border-color: $color-border;
  border: 1px solid;
  border-radius: 4px;
}
.text-input {
  height: 32px;
  border: none;
  outline: 0;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
}
.text-input::placeholder {
  color: $color-text-placeholder;
  opacity: 1;
}
</style>
