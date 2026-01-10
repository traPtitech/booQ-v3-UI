<script setup lang="ts">
import Button from 'primevue/button';

interface Props {
  label: string;
  color?: 'primary' | 'error' | 'secondary';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
});

// Tailwind クラスを色ごとに定義
const colorClasses = {
  primary: [
    'bg-[var(--color-primary)]',
    'border-[var(--color-primary)]',
    'text-[var(--color-text-white)]',
    'hover:bg-[var(--color-primary-hover)]',
    'hover:border-[var(--color-border-hover)]',
    'hover:text-[var(--color-primary)]',
  ],
  error: [
    'bg-[var(--color-error)]',
    'border-[var(--color-error)]',
    'text-[var(--color-text-white)]',
    'hover:bg-[#ff6a33]',
    'hover:border-[#cc3700]',
  ],
  secondary: [
    'bg-[var(--color-secondary)]',
    'border-[var(--color-secondary)]',
    'text-[var(--color-text-secondary)]',
    'hover:bg-[var(--color-secondary-hover)]',
    'hover:border-[#cbcbcb]',
  ],
};
</script>

<template>
  <Button
    :label="props.label"
    :pt="{
      root: {
        class: [
          'border-2',
          'text-base',
          'font-bold',
          'leading-normal',
          'transition-all',
          'duration-200',
          'ease-in-out',
          'active:scale-95',
          'active:shadow-lg',
          ...colorClasses[props.color],
        ],
      },
    }"
  />
</template>
EOF