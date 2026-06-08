<script setup lang="ts">
import InputText from 'primevue/inputtext';

const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    type?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    borderColor?: string;
  }>(),
  {
    type: 'text',
    size: 'md',
  },
);
</script>

<template>
  <div
    class="background"
    :class="[
      `size-${props.size}`,
      { 'is-invalid': props.invalid, 'is-disabled': props.disabled },
    ]"
    :style="
      props.borderColor ? { '--local-border': props.borderColor } : undefined
    "
  >
    <div v-if="$slots['left']" class="side-icon">
      <slot name="left" />
    </div>
    <InputText
      v-model="model"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :invalid="props.invalid"
      :pt="{ root: { class: ['text-input', `text-input--${props.size}`] } }"
    />
    <div v-if="$slots['right']" class="side-icon">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.background {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--local-border, var(--color-border));
  border-radius: 4px;
}

.background.size-sm {
  height: 24px;
}
.background.size-md {
  height: 32px;
}
.background.size-lg {
  height: 40px;
}

.background:focus-within {
  outline: 2px solid var(--color-primary);
}

.background.is-invalid {
  border-color: var(--color-error);
}

.background.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.text-input {
  height: 100%;
  border: none;
  outline: none;
  font-weight: 500;
  background-color: transparent;
}

.text-input--sm {
  padding: 2px 8px;
  font-size: 14px;
}
.text-input--md {
  padding: 8px 8px;
  font-size: 16px;
}
.text-input--lg {
  padding: 12px 8px;
  font-size: 18px;
}

.text-input::placeholder {
  color: var(--color-text-placeholder);
}

.side-icon {
  display: flex;
  padding: 0 4px;
  height: 100%;
  align-items: center;
}
</style>
