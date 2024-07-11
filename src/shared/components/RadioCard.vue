<template>
  <div :class="$style.container">
    <div :class="$style.title_wrapper">
      <div :class="$style.title">選択肢</div>
      <radio-button />
    </div>
    <div :class="$style.text">選択肢1の説明</div>
  </div>
</template>

<script lang="ts" setup>
import RadioButton from 'primevue/radiobutton';

const props = withDefaults(
  defineProps<{
    width?: string;
  }>(),
  {
    width: '320px',
  },
);

props.width;
</script>

<style lang="scss" module>
.container {
  width: 351px;
  height: 112px;
  padding: 16px;
  font-size: 16px;
  border: 1px solid $color-secondary;
  border-radius: 4px;
}

.title_wrapper {
  display: flex;
  justify-content: space-between;
}

.title {
  color: $color-text-primary;
  font-weight: bold;
  margin-bottom: 8px;
}

.text {
  color: $color-text-secondary;
  font-size: 16px;
}
</style>
