<script setup lang="ts">
import Button from 'primevue/button';
interface Props {
  label: string;
  color?: 'primary' | 'error' | 'secondary';
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
});
</script>

<template>
  <Button class="button-color" :class="`color-${color}`">
    <span>{{ label }}</span>
  </Button>
</template>

<style lang="scss" scoped>
.button-color {
  border-width: 2px;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    border-color: $color-border-hover;
  }

  &.color-primary {
    background-color: $color-primary;
    border-color: $color-primary;
  }

  &.color-error {
    background-color: $color-error;
    border-color: $color-error;
  }

  &.color-secondary {
    background-color: $color-secondary;
    border-color: $color-secondary;
  }
}
.buton-hover {
  &:hover {
    background-color: $color-primary;
    border-color: $color-border-hover;
  }
}
</style>
