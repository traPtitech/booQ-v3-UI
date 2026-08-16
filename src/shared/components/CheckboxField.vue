<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import PrimeCheckbox from 'primevue/checkbox';

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
}>();

const model = defineModel<boolean>({ default: false });

const checkboxDesignTokens = {
  root: {
    width: '1.5rem',
    height: '1.5rem',
    background: 'var(--color-secondary-container)',
    borderColor: 'var(--color-secondary)',
    checkedBackground: 'var(--color-primary)',
    checkedBorderColor: 'var(--color-primary)',
  },
};
</script>

<template>
  <label
    v-if="$slots['default']"
    :class="[
      'flex items-center gap-2 text-base',
      disabled
        ? 'cursor-not-allowed text-(--color-text-disabled)'
        : 'cursor-pointer text-(--color-text)',
    ]"
  >
    <PrimeCheckbox
      v-model="model"
      binary
      :disabled="disabled"
      v-bind="{ ariaLabel, ariaLabelledby, ...$attrs }"
      :dt="checkboxDesignTokens"
    >
      <template #icon="{ checked }">
        <Icon
          v-if="checked"
          icon="mdi:check"
          class="h-4 w-4 text-(--color-text-on-primary)"
        />
      </template>
    </PrimeCheckbox>
    <span><slot /></span>
  </label>
  <PrimeCheckbox
    v-else
    v-model="model"
    binary
    :disabled="disabled"
    v-bind="{ ariaLabel, ariaLabelledby, ...$attrs }"
    :dt="checkboxDesignTokens"
  >
    <template #icon="{ checked }">
      <Icon
        v-if="checked"
        icon="mdi:check"
        class="h-4 w-4 text-(--color-text-on-primary)"
      />
    </template>
  </PrimeCheckbox>
</template>
