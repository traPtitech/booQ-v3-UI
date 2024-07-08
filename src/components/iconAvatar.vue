<script setup lang="ts">
import Avatar from 'primevue/avatar';
defineProps<{
  name: string;
}>();
</script>
<template>
  <div>
    <avatar
      :image="`https://q.trap.jp/api/v3/public/icon/${name}`"
      class="mr-2"
      size="xlarge"
      shape="circle"
    />
  </div>
</template>
