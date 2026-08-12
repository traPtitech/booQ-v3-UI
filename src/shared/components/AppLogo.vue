<template>
  <div :class="$style.logo">
    <img
      src="@/assets/img/logo.svg"
      alt=""
      aria-hidden="true"
      :class="$style.icon"
    />
    <span>booQ</span>
  </div>
</template>

<style module>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--color-primary);
  font-size: 20px;
  font-weight: 800;
  line-height: normal;
  white-space: nowrap;
}

.icon {
  width: 24.825px;
  height: 32px;
  flex-shrink: 0;
}
</style>
