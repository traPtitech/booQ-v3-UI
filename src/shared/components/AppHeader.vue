<template>
  <div class="flex items-center justify-between px-8 py-4 border-b border-(--color-secondary)">
    <div class="mr-auto">
      <AppLogo />
    </div>
    <div class="flex items-center gap-4">
      <Button label="物品を追加" />
      <IconAvatar :name="userName" :pixel="36" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import AppLogo from '@/shared/components/AppLogo.vue';
import IconAvatar from '@/shared/components/IconAvatar.vue';

const userName = 'o_ER4';
</script>
