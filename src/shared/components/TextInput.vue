<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  placeholder: string;
  size: number;
}>();
</script>

<template>
  <div class="background">
    <div v-if="$slots['left']" class="side-icon">
      <slot name="left" />
    </div>
    <input
      type="text"
      class="text-input"
      :size="size"
      :placeholder="placeholder"
    />
    <div v-if="$slots['right']" class="side-icon">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  display: inline flex;
  height: 32px;
  align-items: center;
  border-color: $color-border;
  border: 1px solid;
  border-radius: 4px;
}
.background:focus-within {
  outline: 2px solid;
}
.text-input {
  height: 32px;
  padding: 8px 8px;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
}
.text-input::placeholder {
  color: $color-text-placeholder;
  opacity: 1;
}
.side-icon {
  display: flex;
  padding: 0 4px;
  height: 32px;
  align-items: center;
}
</style>
