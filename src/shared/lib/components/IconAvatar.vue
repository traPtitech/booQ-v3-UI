<script setup lang="ts">
import Avatar from 'primevue/avatar';
defineProps<{
  name: string;
}>();
</script>
<template>
  <Avatar
    :image="`https://q.trap.jp/api/v3/public/icon/${name}`"
    class="mr-2"
    size="xlarge"
    shape="circle"
  />
</template>
