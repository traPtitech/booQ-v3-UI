<script setup lang="ts">
import { defineProps } from 'vue';
import chip from 'primevue/chip';

defineProps<{
  label: string;
}>();
</script>
<template>
  <chip class="p-chip">
    <span>{{ label }}</span>
  </chip>
</template>
