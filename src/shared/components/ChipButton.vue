<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import Button from 'primevue/button';
import IconClose from './IconClose.vue';
import IconPlus from './IconPlus.vue';

const props = defineProps<{
  label: string;
  type: 'default' | 'new';
}>();
defineEmits(['action']);

const chipStyle = computed(() => ({
  'button-chip': props.type === 'default',
  'button-newchip': props.type === 'new',
}));
</script>

<template>
  <Button class="button" :class="chipStyle" @click="$emit('action')">
    <span>{{ label }}</span>
    <IconClose v-if="type === 'default'" />
    <IconPlus v-else-if="type === 'new'" />
  </Button>
</template>
<style lang="scss" scoped>
.button {
  display: inline flex;
  gap: 8px;
  height: 32px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
}
.button-chip {
  background-color: $color-container-primary;
  border-color: $color-container-primary;
  color: $color-primary;
}
.button-newchip {
  background-color: $color-container-secondary;
  border-color: $color-container-secondary;
  color: $color-text-dimmed;
}
</style>
