<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  name: string;
}>();
</script>
<template>
  <div>
    <div class="p-chip">
      <span>{{ name }}</span>
    </div>
  </div>
</template>
