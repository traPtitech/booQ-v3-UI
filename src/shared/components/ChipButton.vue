<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
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
defineEmits(['action', 'close']);

type Variant = 'new' | 'primary' | 'secondary' | 'error';

const bgClasses: Record<Variant, string> = {
  new: 'bg-[var(--color-container-secondary)] border-[var(--color-container-secondary)] hover:bg-[var(--color-container-secondary-hover)] hover:border-[var(--color-container-secondary-hover)] active:bg-[var(--color-container-secondary-active)] active:border-[var(--color-container-secondary-active)]',
  primary:
    'bg-[var(--color-container-primary)] border-[var(--color-container-primary)] hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-border-hover)] active:bg-[var(--color-container-primary-active)] active:border-[var(--color-container-primary-active)]',
  secondary:
    'bg-[var(--color-secondary)] border-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:border-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] active:border-[var(--color-secondary-active)]',
  error:
    'bg-[var(--color-error-container)] border-[var(--color-error-container)] hover:bg-[var(--color-error-container-hover)] hover:border-[var(--color-error-container-hover)] active:bg-[var(--color-error-container-active)] active:border-[var(--color-error-container-active)]',
};

const textClasses: Record<Variant, string> = {
  new: 'text-[var(--color-text-dimmed)]',
  primary: 'text-[var(--color-primary)]',
  secondary: 'text-[var(--color-text-secondary)]',
  error: 'text-[var(--color-error)]',
};

const variant = computed<Variant>(() =>
  props.type === 'new' ? 'new' : (props.colorType ?? 'primary'),
);
</script>

<template>
  <div
    class="inline-flex gap-2 h-8 rounded-2xl px-3 py-1 border border-transparent"
    :class="[bgClasses[variant], textClasses[variant]]"
  >
    <Button
      class="p-0 text-base font-bold leading-normal bg-transparent! border-0! shadow-none! text-inherit"
      @click="$emit('action')"
    >
      <div class="flex gap-2 items-center">
        <span>{{ props.label }}</span>
        <IconPlus v-if="props.type === 'new'" />
      </div>
    </Button>
    <Button
      v-if="props.type === 'show-close'"
      class="p-0 bg-transparent! border-0! shadow-none! text-inherit"
      @click="$emit('close')"
    >
      <IconClose />
    </Button>
  </div>
</template>
