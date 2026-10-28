<script setup lang="ts">
import IconAvatar from '@/shared/components/IconAvatar.vue';
import type { ItemOwnership } from './types';
import { Icon } from '@iconify/vue';

const props = defineProps<{ owner: ItemOwnership }>();
const emit = defineEmits<{ select: [owner: ItemOwnership] }>();
function ownerLabel() {
  const owner = props.owner;
  const status =
    owner.status === 'available'
      ? 'から借りる'
      : owner.status === 'borrowed'
        ? `貸し出し中${owner.returnDate ? `、${owner.returnDate}返却予定` : ''}`
        : '貸し出し不可';
  return `@${owner.name} ${status}`;
}
</script>

<template>
  <div :class="$style.card">
    <button
      type="button"
      :class="[$style.avatarButton, $style[owner.status]]"
      :disabled="owner.status !== 'available'"
      :aria-label="ownerLabel()"
      @click="emit('select', owner)"
    >
      <IconAvatar :name="owner.name" :pixel="64" :class="$style.avatar" />
      <template v-if="owner.status === 'borrowed'">
        <span v-if="owner.returnDate" :class="$style.returnDate"
          >～{{ owner.returnDate }}</span
        >
        <Icon icon="mdi:calendar-clock" :class="$style.calendar" />
      </template>
      <Icon
        v-if="owner.status === 'unavailable'"
        icon="mdi:book-off"
        :class="$style.unavailableIcon"
      />
    </button>
    <span :class="$style.name" :title="`@${owner.name}`"
      >@{{ owner.name }}</span
    >
    <div v-if="owner.comment" :class="$style.comment">
      {{ owner.comment }}
    </div>
  </div>
</template>

<style module>
.card {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 64px;
  min-height: 144px;
}
.avatarButton {
  position: relative;
  display: flex;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.avatarButton:disabled {
  cursor: default;
}
.avatarButton:enabled:hover {
  box-shadow: 0 0 0 5px var(--color-primary-container);
}
.avatarButton:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 6px;
}
.borrowed .avatar,
.unavailable .avatar {
  opacity: 0.5;
}
.avatarButton::after {
  content: '';
  box-sizing: border-box;
  width: 68px;
  height: 68px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.available {
  color: var(--color-primary);
}
.available::after {
  width: 70px;
  height: 70px;
  border-width: 3px;
}
.borrowed {
  color: var(--color-warning);
}
.unavailable {
  color: var(--color-error);
}
.returnDate {
  position: absolute;
  top: 16px;
  left: 0;
  width: 100%;
  color: var(--color-warning);
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
}
.calendar,
.unavailableIcon {
  position: absolute;
  left: 20px;
  width: 24px;
  height: 24px;
}
.calendar {
  top: 37px;
}
.unavailableIcon {
  top: 20px;
}
.name {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text-dimmed);
  font-size: 14px;
}
.comment {
  position: relative;
  width: 100%;
  margin-top: 5px;
  padding: 2px 4px;
  border-radius: 4px;
  background: var(--color-background);
  box-shadow: inset 0 0 0 1px var(--color-secondary-container);
  color: var(--color-text);
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.comment::before {
  content: '';
  width: 7.68401px;
  height: 6.75px;
  background: var(--color-background);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  position: absolute;
  top: -5px;
  left: calc(50% - 3.842px);
}
</style>
