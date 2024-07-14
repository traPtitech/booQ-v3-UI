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
    :style="`width: ${props.width}; height: ${props.height}`"
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
    height: '88px',
  },
);

const model = defineModel<string>();
</script>

<style lang="scss" module>
.container {
  box-shadow: inset 0 0 0 1px $color-secondary;
  border-radius: 4px;
  display: inline-block;
  padding: 16px;
  font-size: 16px;
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
  text-align: left;
}

.input {
  display: none;
}

.btn {
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 24px;
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
