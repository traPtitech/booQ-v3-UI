<script setup lang="ts">
import Button from 'primevue/button';
defineProps<{
  label: string;
}>();
</script>

<template>
  <Button class="button-color"
    ><span>{{ label }}</span></Button
  >
</template>
<style lang="scss" scoped>
.button-color {
  background-color: $color-primary;
  border-color: $color-primary;
  border-width: 2px;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
}
.buton-color:active {
  border-color: $color-border-hover;
}
.buton-color:hover {
  background-color: $color-primary-hover;
}
</style>
