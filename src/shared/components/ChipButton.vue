<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import Button from 'primevue/button';

const props = defineProps<{
  label: string;
  chipType: number;
}>();
defineEmits(['onClick']);

const chipStyle = computed(() => ({
  'button-chip': props.chipType === 0,
  'button-newchip': props.chipType === 1,
}));
</script>

<template>
  <Button class="button" :class="chipStyle" @click="$emit('onClick')">
    <span>{{ label }}</span>
    <svg
      v-if="chipType === 0"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="#5CB860"
      />
    </svg>
    <svg
      v-if="chipType === 1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#626264" />
    </svg>
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
