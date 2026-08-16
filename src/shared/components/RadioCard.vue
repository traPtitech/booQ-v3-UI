<template>
  <label :class="$style.label">
    <input
      :class="$style.input"
      type="radio"
      :name="props.name"
      :value="props.value"
      :checked="model === props.value"
      @change="model = props.value"
    />
    <div :class="$style.container">
      <div :class="$style.title_wrapper">
        <div :class="$style.title">{{ props.title }}</div>
        <div :class="$style.btn"></div>
      </div>
      <div :class="$style.content">
        {{ props.content }}
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  content: string;
  name: string;
  value: string;
}>();

const model = defineModel<string>();
</script>

<style module>
.label {
  position: relative;
  display: block;
  max-width: 100%;
}

.container {
  display: flex;
  padding: 16px;
  border-radius: 4px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  background: var(--color-background);
  box-shadow: inset 0 0 0 1px var(--color-secondary);
  box-sizing: border-box;
  cursor: pointer;
}

.container:hover {
  background-color: var(--color-primary-hover);
}

.input:checked + .container {
  box-shadow: inset 0 0 0 3px var(--color-primary);
}

.title_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}

.title {
  color: var(--color-text);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.content {
  text-align: left;
  align-self: stretch;
  color: var(--color-text-dimmed);
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.input {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.input:focus-visible + .container {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--color-secondary-container);
  border: 2px solid var(--color-secondary);
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}

.input:checked + .container .title_wrapper .btn::before {
  background-color: var(--color-primary);
  border: none;
}

.input:checked + .container .title_wrapper .btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 11;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background-color: var(--color-background);
  transform: translate(-50%, -50%);
}
</style>
