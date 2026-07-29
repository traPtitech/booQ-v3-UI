<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string;
    size?: 'md';
  }>(),
  {
    size: 'md',
  },
);
</script>

<template>
  <div class="background">
    <div v-if="$slots['left']" class="side-icon">
      <slot name="left" />
    </div>
    <input type="text" class="text-input" :placeholder="placeholder" />
    <div v-if="$slots['right']" class="side-icon">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.background {
  display: inline-flex;
  width: 306px;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  box-sizing: border-box;
}

.background:focus-within {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 1px var(--color-primary);
}

.text-input {
  min-width: 0;
  flex: 1;
  padding: 0;
  appearance: none;
  border: none;
  outline: none;
  box-shadow: none;
  color: var(--color-text);
  background-color: transparent;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.text-input::placeholder {
  color: var(--color-text-placeholder);
  opacity: 1;
}

.side-icon {
  display: flex;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
