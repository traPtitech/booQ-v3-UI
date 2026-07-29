<script setup lang="ts">
interface Props {
  label: string;
  color?: 'primary' | 'error' | 'secondary';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    type="button"
    :class="[$style.button, $style[props.color]]"
    @click="emit('click', $event)"
  >
    {{ props.label }}
  </button>
</template>

<style module>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border: 0;
  border-radius: 4px;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  cursor: pointer;
}

.button:focus-visible {
  outline: 2px solid var(--color-border);
  outline-offset: 2px;
}

.primary {
  color: var(--color-text-on-primary);
  background: var(--color-primary);
}

.primary:hover {
  color: var(--color-primary);
  background: var(--color-primary-hover);
}

.secondary {
  color: var(--color-text-dimmed);
  background: var(--color-secondary-container);
}

.secondary:hover {
  background: var(--color-primary-hover);
}

.error {
  color: var(--color-text-on-primary);
  background: var(--color-error);
}

.error:hover {
  color: var(--color-error);
  background: var(--color-error-hover);
}
</style>
