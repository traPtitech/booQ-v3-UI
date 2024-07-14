<template>
  <input
    :id="props.inputId"
    :class="$style.input"
    type="radio"
    :name="props.name"
    :value="props.value"
    @change="model = props.value"
  />
  <label
    :class="$style.container"
    :style="`width: ${props.width}`"
    :for="props.inputId"
  >
    <div :class="$style.title_wrapper">
      <div :class="$style.title">{{ props.title }}</div>
      <div :class="$style.btn"></div>
    </div>
    <div :class="$style.content">
      {{ props.content }}
    </div>
  </label>
</template>

<script lang="ts" setup>
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
    width: '310px',
  },
);

const model = defineModel<string>();
</script>

<style lang="scss" module>
.container {
  box-shadow: inset 0 0 0 1px $color-secondary;
  border-radius: 4px;
  display: flex;
  width: 351px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}

.container:hover {
  background-color: $color-primary-hover;
}

.input:checked + .container {
  box-shadow: inset 0 0 0 3px $color-primary;
}

.title_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}

.title {
  color: $color-text-primary;
  font-weight: bold;
}

.content {
  font-size: 16px;
  text-align: left;
  align-self: stretch;
  color: $color-text-dimmed;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.input {
  display: none;
}

.btn {
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.btn::before {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: $color-container-secondary;
  border: 2px solid $color-secondary;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  box-sizing: border-box;
}

.input:checked + .container .title_wrapper .btn::before {
  background-color: $color-primary;
  border: none;
}

.input:checked + .container .title_wrapper .btn::after {
  content: '';
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background-color: $color-background;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
}
</style>
