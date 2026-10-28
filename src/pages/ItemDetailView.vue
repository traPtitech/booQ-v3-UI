<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import AppHeader from '@/shared/components/AppHeader.vue';
import ChipButton from '@/shared/components/ChipButton.vue';
import ChipCard from '@/shared/components/ChipCard.vue';
import BorrowDialog from '@/features/item-detail/BorrowDialog.vue';
import {
  itemDetails,
  owners as mockOwners,
  currentUser,
} from '@/features/item-detail/mockData';
import AppNotification from '@/shared/components/AppNotification.vue';
import { Icon } from '@iconify/vue';
import ExpandableDescription from '@/features/item-detail/ExpandableDescription.vue';

import ItemOwners from '@/features/item-detail/ItemOwners.vue';
import ItemOwnersModal from '@/features/item-detail/ItemOwnersModal.vue';
import ItemComments from '@/features/item-detail/ItemComments.vue';
import { mockBorrow } from '@/features/item-detail/mockBorrow';
import type {
  BorrowFormValues,
  BorrowRequest,
  ItemKind,
  ItemOwnership,
} from '@/features/item-detail/types';

const props = defineProps<{
  kind: ItemKind;
  ownersVariant?: 'inline' | 'modal';
  ownerCount?: number;
}>();
const owners = computed(() => mockOwners.slice(0, props.ownerCount));
const item = computed(() => itemDetails[props.kind]);
const equipment = computed(() => props.kind === 'equipment');
const liked = ref(item.value.liked);
const likeCount = computed(
  () => item.value.likeCount + Number(liked.value) - Number(item.value.liked),
);
const expanded = ref(false);
const tags = ref([...item.value.tags]);
const comment = ref<string | undefined>('');
const comments = ref([...item.value.comments]);
const dialogVisible = ref(false);
const ownerListVisible = ref(false);
const returnToOwners = ref(false);
const selectedOwner = ref<ItemOwnership>();
const submitting = ref(false);
const submitError = ref('');
let borrowController: AbortController | undefined;

function cancelBorrow() {
  borrowController?.abort();
  borrowController = undefined;
  submitting.value = false;
}
onBeforeUnmount(cancelBorrow);
watch(dialogVisible, (visible) => {
  if (!visible) cancelBorrow();
});
const notification = ref('');

watch(
  () => [props.kind, props.ownersVariant],
  () => {
    cancelBorrow();
    ownerListVisible.value = false;
    returnToOwners.value = false;
    selectedOwner.value = undefined;
    submitError.value = '';
    liked.value = item.value.liked;
    expanded.value = false;
    tags.value = [...item.value.tags];
    comment.value = '';
    comments.value = [...item.value.comments];
    dialogVisible.value = false;
    notification.value = '';
  },
);

function openBorrow(owner?: ItemOwnership, fromList = false) {
  if (submitting.value) return;
  returnToOwners.value = fromList;
  selectedOwner.value = owner;
  submitError.value = '';
  notification.value = '';
  dialogVisible.value = true;
}

function finishBorrowClose() {
  if (returnToOwners.value && props.ownersVariant === 'modal') {
    returnToOwners.value = false;
    ownerListVisible.value = true;
  }
}

async function submitBorrow(values: BorrowFormValues) {
  if (submitting.value) return;
  let request: BorrowRequest;
  if (equipment.value) {
    request = { kind: 'equipment', itemId: item.value.id, ...values };
  } else if (selectedOwner.value) {
    request = {
      kind: 'personal',
      itemId: item.value.id,
      ownershipId: selectedOwner.value.ownershipId,
      ...values,
    };
  } else {
    submitError.value = '所有者を選択してください';
    return;
  }
  const controller = new AbortController();
  borrowController = controller;
  submitting.value = true;
  submitError.value = '';
  try {
    await mockBorrow(request, controller.signal);
    if (controller.signal.aborted) return;
    returnToOwners.value = false;
    dialogVisible.value = false;
    notification.value =
      request.kind === 'equipment'
        ? '備品を借りました'
        : '貸し出しをリクエストしました';
  } catch {
    if (!controller.signal.aborted) {
      submitError.value = '送信できませんでした。もう一度お試しください';
    }
  } finally {
    if (borrowController === controller) {
      borrowController = undefined;
      submitting.value = false;
    }
  }
}

function addComment(body: string) {
  comments.value.unshift({
    id: Date.now(),
    ...currentUser,
    createdAt: new Date().toISOString(),
    body,
  });
  comment.value = '';
}
</script>

<template>
  <AppHeader />
  <Transition
    appear
    :enter-active-class="$style.notificationEnter"
    :leave-active-class="$style.notificationLeave"
    :enter-from-class="$style.notificationHidden"
    :leave-to-class="$style.notificationHidden"
  >
    <AppNotification
      v-if="notification"
      :message="notification"
      @dismiss="notification = ''"
    />
  </Transition>
  <div :class="$style.layout">
    <aside :class="$style.visual">
      <img :src="item.image" :alt="item.title" :class="$style.cover" />
      <button
        type="button"
        :class="[$style.like, { [$style.liked]: liked }]"
        :aria-pressed="liked"
        aria-label="いいね"
        @click="liked = !liked"
      >
        <Icon
          :icon="liked ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'"
          :class="equipment ? $style.smallHeart : $style.heart"
        />
        {{ likeCount }}
      </button>
    </aside>
    <div :class="$style.details">
      <section :class="$style.summary" aria-labelledby="item-title">
        <h1 id="item-title">{{ item.title }}</h1>
        <ExpandableDescription
          v-if="equipment"
          v-model:expanded="expanded"
          :text="item.description"
        />
        <p v-else :class="$style.description">{{ item.description }}</p>
        <div :class="$style.tags">
          <ChipButton
            v-for="tag in tags"
            :key="tag"
            :label="tag"
            type="show-close"
            @close="tags = tags.filter((value) => value !== tag)"
          />
        </div>
      </section>

      <template v-if="equipment">
        <section :class="$style.statusSection" aria-labelledby="status-title">
          <h2 id="status-title">貸し出しステータス</h2>
          <div
            :class="$style.statuses"
            :aria-label="`貸し出し可能${item.stock.available}点、貸し出し不可${item.stock.unavailable}点`"
          >
            <span
              v-for="index in item.stock.available"
              :key="`available-${index}`"
              :class="[$style.status, $style.availableStatus]"
              title="貸し出し可能"
              ><Icon icon="mdi:check"
            /></span>
            <span
              v-for="index in item.stock.unavailable"
              :key="`unavailable-${index}`"
              :class="$style.status"
              title="貸し出し不可"
              ><Icon icon="mdi:book-off"
            /></span>
          </div>
        </section>
        <ChipCard
          :class="$style.borrow"
          label="この備品を借りる"
          :disabled="item.stock.available === 0"
          @click="openBorrow(undefined)"
        />
      </template>
      <ItemOwnersModal
        v-else-if="ownersVariant === 'modal'"
        :key="kind"
        v-model:list-visible="ownerListVisible"
        :owners="owners"
        @select="openBorrow"
      />
      <ItemOwners v-else :key="kind" :owners="owners" @select="openBorrow" />
      <ItemComments
        v-model:draft="comment"
        :comments="comments"
        @submit="addComment"
      />
    </div>
  </div>
  <BorrowDialog
    v-model:visible="dialogVisible"
    :kind="kind"
    :title="item.title"
    :owner="selectedOwner?.name"
    :submitting="submitting"
    :submit-error="submitError"
    @submit="submitBorrow"
    @after-hide="finishBorrowClose"
  />
</template>

<style module>
.notificationEnter {
  transition:
    translate 250ms ease-out,
    opacity 250ms ease-out;
}
.notificationLeave {
  transition:
    translate 200ms ease-in,
    opacity 200ms ease-in;
}
.notificationHidden {
  translate: 0 calc(-100% - 56px);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .notificationEnter,
  .notificationLeave {
    transition: none;
  }
}
.layout {
  display: grid;
  grid-template-columns: 319px minmax(0, 1fr);
  align-items: start;
  gap: 32px;
  width: min(960px, calc(100% - 64px));
  margin: 32px auto;
  text-align: left;
}
.visual {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.cover {
  display: block;
  width: 319px;
  height: 453px;
  object-fit: cover;
}
.like {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--color-text-dimmed);
  font: inherit;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
}
.liked {
  color: var(--color-liked);
}
.heart {
  width: 30px;
  height: 30px;
}
.smallHeart {
  width: 24px;
  height: 24px;
}
.like:has(.smallHeart) {
  font-size: 16px;
}
.details {
  display: flex;
  flex-direction: column;
  gap: 48px;
  min-width: 0;
}
.details h1,
.details h2,
.details p {
  margin: 0;
}
.details h1 {
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.details h2 {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
}
.summary {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.description {
  color: var(--color-text-dimmed);
  font-size: 16px;
  line-height: 1.5;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.statusSection {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.statuses {
  display: flex;
  gap: 8px;
}
.status {
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: var(--color-secondary);
}
.status svg {
  width: 24px;
  height: 24px;
}
.availableStatus {
  color: var(--color-text-on-primary);
  background: var(--color-primary);
}
.availableStatus svg {
  width: 28px;
  height: 28px;
}
.borrow {
  width: 100%;
}
.layout button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
@media (max-width: 800px) {
  .layout {
    grid-template-columns: minmax(160px, 1fr) minmax(0, 2fr);
    gap: 24px;
    width: calc(100% - 32px);
    margin-block: 24px;
  }
  .cover {
    width: 100%;
    height: auto;
    aspect-ratio: 319 / 453;
  }
}
@media (max-width: 600px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .visual {
    width: min(240px, 100%);
    margin: 0 auto;
  }
  .details {
    gap: 32px;
  }
  .details h1 {
    font-size: 22px;
  }
}
</style>
