<template>
  <input
    :id="props.inputId"
    :class="$style.input"
    type="radio"
    :name="props.name"
  />
  <label :for="props.inputId" :class="$style.label"></label>
</template>

<script lang="ts" setup>
const props = defineProps<{
  inputId: string;
  name: string;
}>();
</script>

<style lang="scss" module>
.input {
  display: none;
}

.label {
  width: 24px;
  height: 24px;
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
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: $color-primary;
  border: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  box-sizing: border-box;
}

.input:checked + .label::after {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: $color-background;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
}
</style>
