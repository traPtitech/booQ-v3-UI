<template>
  <header :class="$style.header">
    <div :class="$style.logo">
      <AppLogo />
    </div>
    <div :class="$style.actions">
      <button type="button" :class="$style.registerButton">物品を登録</button>
      <IconAvatar :name="userName" :pixel="32" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppLogo from '@/shared/components/AppLogo.vue';
import IconAvatar from '@/shared/components/IconAvatar.vue';

const userName = 'o_ER4';
</script>

<style module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 32px;
  border-bottom: 1px solid var(--color-divider);
  background: var(--color-background);
  box-sizing: border-box;
}

.logo {
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: center;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.registerButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 0;
  border-radius: 4px;
  color: var(--color-text-on-primary);
  background: var(--color-primary);
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  cursor: pointer;
}

.registerButton:hover {
  color: var(--color-primary);
  background: var(--color-primary-hover);
}
</style>
