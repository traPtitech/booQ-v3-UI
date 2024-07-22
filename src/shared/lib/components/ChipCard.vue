<script setup lang="ts">
import Button from 'primevue/button';
defineProps<{
  label: string;
}>();
</script>

<template>
  <Button class="butoncolor"
    ><span>{{ label }}</span></Button
  >
</template>
<style lang="scss" scoped>
.butoncolor {
  background-color: $color-primary;
  border-color: $color-primary;
  border-width: 2px;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
}
.butoncolor:active {
  border-color: $color-border-hover;
}
.butoncolor:hover {
  background-color: $color-primary-hover;
}
</style>
