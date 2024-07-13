<template>
  <div :class="$style.container">
    <div :class="$style.title_wrapper">
      <div :class="$style.title">選択肢</div>
      <radio-button input-id="1" name="ok" />
    </div>
    <div :class="$style.text">選択肢1の説明</div>
  </div>
</template>

<script lang="ts" setup>
import RadioButton from '@/shared/components/RadioButton.vue';

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
  width: 360px;
  height: 120px;
  padding: 16px;
  font-size: 16px;
  border: 1px solid $color-secondary;
  border-radius: 4px;
}

.title_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.title {
  color: $color-text-primary;
  font-weight: bold;
}

.text {
  color: $color-text-secondary;
  font-size: 16px;
}
</style>
