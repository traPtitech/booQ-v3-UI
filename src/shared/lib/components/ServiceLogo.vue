<template>
  <div class="content">
    <ServiceLogo />
    booQ
  </div>
</template>
<script setup lang="ts">
import ServiceLogo from '@/shared/lib/components/ServiceIcon.vue';
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-primary);
}
</style>
