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

const chipStyle = computed(() => {
  return props.type === 'new'
    ? ['button-newchip']
    : ['button-chip', `button-${props.colorType ?? 'primary'}`];
});
</script>

<template>
  <div class="background" :class="chipStyle">
    <Button class="button" :class="chipStyle" @click="$emit('action')">
      <div class="button-content">
        <span>{{ props.label }}</span>
        <IconPlus v-if="props.type === 'new'" />
      </div>
    </Button>
    <Button
      v-if="props.type === 'show-close'"
      class="button"
      :class="chipStyle"
      @click="$emit('close')"
    >
      <IconClose />
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.background {
  display: inline-flex;
  gap: 8px;
  height: 32px;
  border-radius: 16px;
  padding: 4px 12px;
  border: 1px solid transparent;

  &.button-newchip {
    background-color: $color-container-secondary;
    border-color: $color-container-secondary;

    &:hover {
      background-color: lighten($color-container-secondary, 8%);
      border-color: lighten($color-container-secondary, 8%);
    }
    &:active {
      background-color: darken($color-container-secondary, 8%);
      border-color: darken($color-container-secondary, 8%);
    }
  }

  &.button-chip {
    &.button-primary {
      background-color: $color-container-primary;
      border-color: $color-container-primary;

      &:hover {
        background-color: $color-primary-hover;
        border-color: $color-border-hover;
      }
      &:active {
        background-color: darken($color-container-primary, 5%);
        border-color: darken($color-container-primary, 5%);
      }
    }
    &.button-secondary {
      background-color: $color-secondary;
      border-color: $color-secondary;

      &:hover {
        background-color: lighten($color-secondary, 5%);
        border-color: lighten($color-secondary, 5%);
      }
      &:active {
        background-color: darken($color-secondary, 5%);
        border-color: darken($color-secondary, 5%);
      }
    }
    &.button-error {
      background-color: lighten($color-error, 35%);
      border-color: lighten($color-error, 35%);

      &:hover {
        background-color: lighten($color-error, 30%);
        border-color: lighten($color-error, 30%);
      }
      &:active {
        background-color: lighten($color-error, 25%);
        border-color: lighten($color-error, 25%);
      }
    }
  }
}

.button {
  padding: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: inherit;

  &.button-newchip {
    color: $color-text-dimmed;
  }

  &.button-chip {
    &.button-primary {
      color: $color-primary;
    }
    &.button-secondary {
      color: $color-text-secondary;
    }
    &.button-error {
      color: $color-error;
    }
  }
}

.button-content {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
