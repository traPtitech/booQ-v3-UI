<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import Button from 'primevue/button';
import IconClose from './IconClose.vue';
import IconPlus from './IconPlus.vue';

const props = defineProps<{
  label: string;
  type: 'default' | 'show-close' | 'new';
}>();
defineEmits(['action', 'close']);

const chipStyle = computed(() => ({
  'button-chip': props.type === 'default' || props.type === 'show-close',
  'button-newchip': props.type === 'new',
}));
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
  display: inline flex;
  gap: 8px;
  height: 32px;
  border-radius: 16px;
  padding: 4px 12px;
}
.button {
  padding: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
}
.button-content {
  display: flex;
  gap: 8px;
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
