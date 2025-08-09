<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  placeholder?: string;
  size: 'sm' | 'md' | 'lg';
}>();
</script>

<template>
  <div class="background">
    <div v-if="$slots['left']">
      <slot name="left" class="side-icon" />
    </div>
    <input
      type="text"
      class="text-input"
      :size="size"
      :placeholder="placeholder"
    />
    <div v-if="$slots['right']">
      <slot name="right" class="side-icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  display: inline flex;
  height: 32px;
  align-items: center;
  border: 1px solid1px solid $color-border;
  border-radius: 1px solid;
}

.background:focus-within {
  outline: 2px solid;
  outline-color: $color-primary;
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
}
.side-icon {
  display: flex;
  padding: 0 4px;
  height: 32px;
  align-items: center;
}
</style>
