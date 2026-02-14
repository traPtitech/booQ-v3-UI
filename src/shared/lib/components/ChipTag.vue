<script setup lang="ts">
import Chip from 'primevue/chip';

defineProps<{
  label: string;
}>();
</script>
<template>
  <Chip class="p-chip">
    <span>{{ label }}</span>
  </Chip>
</template>
