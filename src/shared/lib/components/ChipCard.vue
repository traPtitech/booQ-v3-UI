<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
interface Props {
  label: string;
  color?: 'primary' | 'error' | 'secondary';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
});

const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-[16px] font-bold transition duration-200 ' +
    'active:scale-[0.95] active:shadow-[0_0_8px_rgba(0,0,0,0.3)] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]';

  switch (props.color) {
    case 'secondary':
      return (
        base +
        ' bg-[var(--color-secondary)] border-[var(--color-secondary)] text-[var(--color-text-secondary)] ' +
        'hover:bg-[var(--color-secondary-hover)] hover:border-[color-mix(in_srgb,var(--color-secondary)_70%,#000_30%)]'
      );
    case 'error':
      return (
        base +
        ' bg-[var(--color-error)] border-[var(--color-error)] text-[var(--color-text-white)] ' +
        'hover:bg-[color-mix(in_srgb,var(--color-error)_90%,#fff_10%)] hover:border-[color-mix(in_srgb,var(--color-error)_80%,#000_20%)]'
      );
    default:
      return (
        base +
        ' bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-text-white)] ' +
        'hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-primary)]'
      );
  }
});
</script>

<template>
  <Button :class="classes" type="button">
    <span>{{ props.label }}</span>
  </Button>
</template>
