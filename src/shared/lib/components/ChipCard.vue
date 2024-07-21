<script setup lang="ts">
import Button from 'primevue/button';
defineProps<{
  label: string;
}>();
</script>

<template>
  <Button
    ><span>{{ label }}</span></Button
  >
</template>
