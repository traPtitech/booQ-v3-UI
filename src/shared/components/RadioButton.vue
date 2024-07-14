<template>
  <input
    :id="props.inputId"
    :class="$style.input"
    type="radio"
    :name="props.name"
    :value="props.value"
  />
  <label
    :for="props.inputId"
    :class="$style.label"
    :style="`width: ${props.size}; height: ${props.size}`"
  >
  </label>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    inputId: string;
    name: string;
    value: string;
    size?: string;
  }>(),
  {
    size: '24px',
  },
);
</script>

<style lang="scss" module>
.input {
  display: none;
}

.label {
  display: inline-block;
  cursor: pointer;
  position: relative;
}

.label::before {
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

.input:checked + .label::before {
  background-color: $color-primary;
  border: none;
}

.input:checked + .label::after {
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
