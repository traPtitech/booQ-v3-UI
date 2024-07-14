<template>
  <label
    :class="$style.container"
    :style="`width: ${props.width}; height: ${props.height}`"
  >
    <div :class="$style.title_wrapper">
      <div :class="$style.title">{{ props.title }}</div>
      <radio-button
        :input-id="props.inputId"
        :name="props.name"
        :value="props.value"
      />
    </div>
    <div :class="$style.content">
      {{ props.content }}
    </div>
  </label>
</template>

<script lang="ts" setup>
import RadioButton from '@/shared/components/RadioButton.vue';

const props = withDefaults(
  defineProps<{
    title: string;
    content: string;
    inputId: string;
    name: string;
    value: string;
    width?: string;
    height?: string;
  }>(),
  {
    width: '351px',
    height: '112px',
  },
);
</script>

<style lang="scss" module>
.container {
  display: inline-block;
  padding: 16px;
  font-size: 16px;
  border: 1px solid $color-secondary;
  border-radius: 4px;
  cursor: pointer;
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

.content {
  color: $color-text-secondary;
  font-size: 16px;
  line-height: 150%;
  text-align: left;
}
</style>
