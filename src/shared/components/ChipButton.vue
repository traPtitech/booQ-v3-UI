<script setup lang="ts">
import { computed } from 'vue';
import IconClose from './IconClose.vue';
import IconPlus from './IconPlus.vue';

interface Props {
  label: string;
  type: 'default' | 'show-close' | 'new';
  colorType?: 'primary' | 'secondary' | 'error';
}

const props = withDefaults(defineProps<Props>(), {
  colorType: 'primary',
});
const emit = defineEmits<{
  action: [];
  close: [];
}>();

type Variant = 'new' | 'primary' | 'secondary' | 'error';

const variant = computed<Variant>(() =>
  props.type === 'new' ? 'new' : (props.colorType ?? 'primary'),
);
</script>

<template>
  <div :class="[$style.chip, $style[variant]]">
    <button type="button" :class="$style.action" @click="emit('action')">
      <span>{{ props.label }}</span>
      <IconPlus v-if="props.type === 'new'" />
    </button>
    <button
      v-if="props.type === 'show-close'"
      type="button"
      :class="$style.close"
      :aria-label="`${props.label}を削除`"
      @click="emit('close')"
    >
      <IconClose />
    </button>
  </div>
</template>

<style module>
.chip {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 16px;
  box-sizing: border-box;
}

.action,
.close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  cursor: pointer;
}

.action {
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
}

.close {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.action:focus-visible,
.close:focus-visible {
  border-radius: 2px;
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.primary {
  color: var(--color-primary);
  background: var(--color-primary-container);
}

.new,
.secondary {
  color: var(--color-text-dimmed);
  background: var(--color-secondary-container);
}

.primary:hover,
.new:hover,
.secondary:hover {
  background: var(--color-primary-hover);
}

.error {
  color: var(--color-error);
  background: color-mix(in srgb, var(--color-error), white 82%);
}

.error:hover {
  background: var(--color-error-hover);
}
</style>
