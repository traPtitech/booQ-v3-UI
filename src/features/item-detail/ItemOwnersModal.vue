<script setup lang="ts">
import { computed, useId } from 'vue';
import AppDialog from '@/shared/components/AppDialog.vue';
import ChipCard from '@/shared/components/ChipCard.vue';
import BookingOwnerCard from './BookingOwnerCard.vue';
import type { ItemOwnership } from './types';

const props = defineProps<{ owners: ItemOwnership[] }>();
const emit = defineEmits<{
  select: [owner: ItemOwnership, fromList?: boolean];
}>();
const titleId = useId();
const visible = defineModel<boolean>('listVisible', { default: false });
const previewLimit = 5;
const previewOwners = computed(() => props.owners.slice(0, previewLimit));
const additionalCount = computed(() =>
  Math.max(0, props.owners.length - previewLimit),
);
let pendingOwner: ItemOwnership | undefined;

function selectOwner(owner: ItemOwnership) {
  pendingOwner = owner;
  visible.value = false;
}

function finishSelection() {
  if (pendingOwner) {
    const owner = pendingOwner;
    pendingOwner = undefined;
    emit('select', owner, true);
  }
}
</script>

<template>
  <section :class="$style.ownership" :aria-labelledby="titleId">
    <div :class="$style.heading">
      <h2 :id="titleId">この物品を借りる</h2>
      <p>誰から借りるかを選択してください</p>
    </div>
    <div :class="$style.preview">
      <BookingOwnerCard
        v-for="owner in previewOwners"
        :key="owner.ownershipId"
        :owner="owner"
        @select="emit('select', $event)"
      />
      <button
        v-if="additionalCount"
        type="button"
        :class="$style.more"
        :aria-label="`ほか${additionalCount}件を含む所有者一覧を表示`"
        aria-haspopup="dialog"
        @click="visible = true"
      >
        <span>{{ additionalCount }}+</span>
      </button>
    </div>
  </section>
  <AppDialog v-model:visible="visible" @after-hide="finishSelection">
    <template #title>所有者一覧</template>
    <div :class="$style.modalBody">
      <p :class="$style.help">誰から借りるかを選択してください</p>
      <div :class="$style.grid">
        <BookingOwnerCard
          v-for="owner in owners"
          :key="owner.ownershipId"
          :owner="owner"
          @select="selectOwner"
        />
      </div>
      <div :class="$style.actions">
        <ChipCard label="閉じる" color="secondary" @click="visible = false" />
      </div>
    </div>
  </AppDialog>
</template>

<style module>
.ownership {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.heading h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
}
.heading p,
.help {
  margin: 0;
  color: var(--color-text-dimmed);
  line-height: 1.5;
}
.preview {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  padding-block: 3px;
}
.more {
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border: 0;
  padding: 0;
  border-radius: 50%;
  background: var(--color-secondary);
  color: var(--color-text);
  font: inherit;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}
.more span {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.more:hover {
  box-shadow: 0 0 0 4px var(--color-secondary-container);
}
.more:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
.modalBody {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 64px);
  gap: 24px 16px;
  padding: 6px;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
