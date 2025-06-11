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
    color: $color-text-white;

    &:hover {
      background-color: $color-primary-hover;
      border-color: $color-border-hover;
      color: $color-primary;
    }
  }

  &.color-error {
    background-color: $color-error;
    border-color: $color-error;
    color: $color-text-white;

    &:hover {
      background-color: lighten($color-error, 10%);
      border-color: darken($color-error, 10%);
    }
  }

  &.color-secondary {
    background-color: $color-secondary;
    border-color: $color-secondary;
    color: $color-text-secondary; // 文字色

    &:hover {
      background-color: $color-secondary-hover;
      border-color: darken($color-secondary, 10%);
      // 必要に応じてホバー時の文字色も指定
    }
  }
}
</style>
