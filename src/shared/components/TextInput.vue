<script setup lang="ts">
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
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.background:focus-within {
  outline: 2px solid;
  outline-color: var(--color-primary);
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
  color: var(--color-text-placeholder);
}
.side-icon {
  display: flex;
  padding: 0 4px;
  height: 32px;
  align-items: center;
}
</style>
