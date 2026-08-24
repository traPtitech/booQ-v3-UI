<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Icon } from '@iconify/vue';
import PrimeDatePicker from 'primevue/datepicker';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    showTime?: boolean;
    disabled?: boolean;
    manualInput?: boolean;
    fullWidth?: boolean;
    inputId?: string;
    inputAriaLabel?: string;
    minDate?: Date;
    maxDate?: Date;
    stepMinute?: number;
  }>(),
  {
    showTime: true,
    disabled: false,
    manualInput: false,
    fullWidth: false,
    stepMinute: 5,
  },
);

const model = defineModel<Date | null>({ default: null });
const attrs = useAttrs();

const datePickerDesignTokens = {
  date: {
    borderRadius: '4px',
  },
  colorScheme: {
    light: {
      panel: {
        color: 'var(--color-text)',
      },
      header: {
        color: 'var(--color-text)',
      },
      weekDay: {
        color: 'var(--color-text)',
      },
      date: {
        color: 'var(--color-text)',
        selectedBackground:
          'color-mix(in srgb, var(--color-primary) 30%, transparent)',
        selectedColor: 'var(--color-text)',
      },
      today: {
        background: 'transparent',
        color: 'var(--color-primary)',
      },
    },
  },
};

const resolvedPlaceholder = computed(
  () =>
    props.placeholder ?? (props.showTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD'),
);
const forwardedProps = computed(() => ({
  ...attrs,
  ariaLabel: props.inputAriaLabel,
}));

const handleUpdate = (
  value: Date | Date[] | Array<Date | null> | null | undefined,
) => {
  if (value instanceof Date || value === null) {
    model.value = value;
  }
};
</script>

<template>
  <PrimeDatePicker
    :model-value="model"
    v-bind="forwardedProps"
    :class="[$style.picker, { [$style.fullWidth]: props.fullWidth }]"
    :dt="datePickerDesignTokens"
    :panel-class="$style.panel"
    :placeholder="resolvedPlaceholder"
    :show-time="props.showTime"
    :disabled="props.disabled"
    :manual-input="props.manualInput"
    :input-id="props.inputId"
    :min-date="props.minDate"
    :max-date="props.maxDate"
    :step-minute="props.stepMinute"
    date-format="yy/mm/dd"
    hour-format="24"
    show-icon
    icon-display="input"
    fluid
    @update:model-value="handleUpdate"
  >
    <template #inputicon="{ class: inputIconClass, clickCallback }">
      <span
        :class="[inputIconClass, $style.inputIconButton]"
        @click="clickCallback"
      >
        <Icon icon="mdi:calendar" :class="$style.inputIcon" />
      </span>
    </template>
  </PrimeDatePicker>
</template>

<style module>
.picker {
  display: inline-flex;
  width: min(306px, 100%);
  text-align: left;
}

.fullWidth {
  display: flex;
  width: 100%;
}

.picker :global(.p-datepicker-input) {
  min-width: 0;
  padding-block: 8px;
  border-color: var(--color-border);
  border-radius: 4px;
  color: var(--color-text);
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.picker :global(.p-datepicker-input::placeholder) {
  color: var(--color-text-placeholder);
  opacity: 1;
}

.picker :global(.p-datepicker-input:enabled:hover) {
  border-color: var(--color-border);
}

.picker :global(.p-datepicker-input:enabled:focus) {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.picker :global(.p-datepicker-input-icon),
.picker :global(.p-datepicker-clear-icon) {
  color: var(--color-text-dimmed);
}

.picker :global(.p-datepicker-input-icon-container) {
  margin-block-start: -12px;
}

.inputIcon {
  width: 24px;
  height: 24px;
  color: var(--color-border);
}

.inputIconButton {
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel :global(.p-datepicker-day.p-disabled) {
  color: var(--color-text-disabled);
  opacity: 1;
}

.panel :global(.p-datepicker-day-selected) {
  font-weight: 700;
}

.panel
  :global(
    .p-datepicker-today .p-datepicker-day:not(.p-datepicker-day-selected)
  ) {
  font-weight: 800;
}
</style>
