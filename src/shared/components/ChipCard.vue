<script setup lang="ts">
import { Icon } from '@iconify/vue';
interface Props {
  label: string;
  color?: 'primary' | 'error' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    :class="[$style.button, $style[props.color]]"
    @click="emit('click', $event)"
  >
    {{ props.label }}
    <Icon
      v-if="props.loading"
      icon="mingcute:loading-3-fill"
      :class="$style.spinner"
    />
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
.button:disabled {
  opacity: 0.6;
  cursor: default;
}
.spinner {
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.primary {
  color: var(--color-text-on-primary);
  background: var(--color-primary);
}

.primary:enabled:hover {
  color: var(--color-primary);
  background: var(--color-primary-hover);
}

.secondary {
  color: var(--color-text-dimmed);
  background: var(--color-secondary-container);
}

.secondary:enabled:hover {
  background: var(--color-primary-hover);
}

.error {
  color: var(--color-text-on-primary);
  background: var(--color-error);
}

.error:enabled:hover {
  color: var(--color-error);
  background: var(--color-error-hover);
}
</style>
