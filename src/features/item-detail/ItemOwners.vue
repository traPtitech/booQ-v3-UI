<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { useHeightTransition } from '@/shared/composables/useHeightTransition';
import { Icon } from '@iconify/vue';
import BookingOwnerCard from './BookingOwnerCard.vue';
import type { ItemOwnership } from './types';

const props = defineProps<{ owners: ItemOwnership[] }>();
const emit = defineEmits<{ select: [owner: ItemOwnership] }>();
const showAllOwners = ref(false);
const ownersId = useId();
const container = ref<HTMLElement | null>(null);
const scroller = ref<HTMLElement | null>(null);
const shadowLeft = ref(false);
const shadowRight = ref(false);
let resizeObserver: ResizeObserver | undefined;
useHeightTransition(container, () => showAllOwners.value);

function updateShadows() {
  const element = scroller.value;
  shadowLeft.value =
    !!element && !showAllOwners.value && element.scrollLeft > 1;
  shadowRight.value =
    !!element &&
    !showAllOwners.value &&
    element.scrollWidth - element.clientWidth - element.scrollLeft > 1;
}
onMounted(() => {
  resizeObserver = new ResizeObserver(updateShadows);
  if (scroller.value) resizeObserver.observe(scroller.value);
  updateShadows();
});
onBeforeUnmount(() => resizeObserver?.disconnect());
watch([showAllOwners, () => props.owners.length], updateShadows, {
  flush: 'post',
});
</script>

<template>
  <section :class="$style.ownership" aria-labelledby="borrow-title">
    <div :class="$style.borrowHeading">
      <h2 id="borrow-title">この物品を借りる</h2>
      <p>誰から借りるかを選択してください</p>
    </div>
    <div
      ref="container"
      :class="[
        $style.owners,
        { [$style.shadowLeft]: shadowLeft, [$style.shadowRight]: shadowRight },
      ]"
    >
      <div
        :id="ownersId"
        ref="scroller"
        :class="[
          $style.ownerScroll,
          { [$style.ownersExpanded]: showAllOwners },
        ]"
        tabindex="0"
        role="group"
        aria-label="所有者一覧"
        @scroll.passive="updateShadows"
      >
        <BookingOwnerCard
          v-for="owner in owners"
          :key="owner.ownershipId"
          :owner="owner"
          @select="emit('select', $event)"
        />
      </div>
    </div>
    <button
      v-if="owners.length > 5"
      type="button"
      :class="$style.toggleOwners"
      :aria-expanded="showAllOwners"
      :aria-controls="ownersId"
      @click="showAllOwners = !showAllOwners"
    >
      <Icon
        icon="mdi:chevron-down"
        :class="[$style.toggleIcon, { [$style.expandedIcon]: showAllOwners }]"
      />
      {{ showAllOwners ? '折りたたむ' : '所有者をすべて表示' }}
    </button>
  </section>
</template>

<style module>
.ownership {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.borrowHeading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.borrowHeading p {
  color: var(--color-text-dimmed);
  line-height: 1.5;
}
.owners {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
}
.owners::before,
.owners::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  width: 32px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms ease;
}
.owners::before {
  left: 0;
  background: linear-gradient(to right, var(--color-background), transparent);
}
.owners::after {
  right: 0;
  background: linear-gradient(to left, var(--color-background), transparent);
}
.shadowLeft::before,
.shadowRight::after {
  opacity: 1;
}
.ownerScroll {
  display: flex;
  flex: 1;
  min-width: 0;
  gap: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 3px;
  scroll-padding-inline: 3px;
}
.ownerScroll::-webkit-scrollbar {
  display: none;
}
.ownerScroll:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
.ownersExpanded {
  flex-wrap: wrap;
  overflow-x: visible;
}
.toggleOwners {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0;
  padding: 4px 0 0;
  color: var(--color-text-dimmed);
  background: var(--color-background);
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  cursor: pointer;
}
.toggleIcon {
  transition: transform 240ms ease;
  width: 24px;
  height: 24px;
}
.expandedIcon {
  transform: rotate(180deg);
}
.ownership h2,
.ownership p {
  margin: 0;
}
.ownership h2 {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
}
.toggleOwners:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .owners::before,
  .owners::after,
  .toggleIcon {
    transition: none;
  }
}
</style>
