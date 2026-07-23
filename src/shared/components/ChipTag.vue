<script setup lang="ts">
import Chip from 'primevue/chip';
import 'primevue/resources/themes/saga-blue/theme.css';
defineProps<{
  label: string;
}>();
</script>
<template>
  <Chip class="p-chip">
    <span>{{ label }}</span>
  </Chip>
</template>
