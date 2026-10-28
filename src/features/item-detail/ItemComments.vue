<script setup lang="ts">
import { Icon } from '@iconify/vue';
import IconAvatar from '@/shared/components/IconAvatar.vue';
import TextInput from '@/shared/components/TextInput.vue';
import type { ItemComment } from './types';

defineProps<{ comments: ItemComment[] }>();
const comment = defineModel<string | undefined>('draft', { default: '' });
const emit = defineEmits<{ submit: [body: string] }>();

function addComment() {
  const body = comment.value?.trim();
  if (body) emit('submit', body);
}

function formatCommentTime(createdAt: string): string {
  const date = new Date(createdAt);
  const dayFormat = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
  const day = dayFormat.format(date);
  const today = dayFormat.format(new Date());
  if (day === today) return time;
  return `${day.slice(0, 4) === today.slice(0, 4) ? day.slice(5) : day} ${time}`;
}
</script>

<template>
  <section :class="$style.comments" aria-labelledby="comments-title">
    <h2 id="comments-title">コメント</h2>
    <form @submit.prevent="addComment">
      <TextInput
        v-model="comment"
        full-width
        placeholder="コメントを入力"
        input-aria-label="コメント"
      >
        <template #right>
          <button
            type="submit"
            :class="$style.send"
            aria-label="コメントを送信"
            :disabled="!comment?.trim()"
          >
            <Icon icon="mdi:send" />
          </button>
        </template>
      </TextInput>
    </form>
    <div :class="$style.commentList" aria-live="polite">
      <article
        v-for="entry in comments"
        :key="entry.id"
        :class="$style.comment"
      >
        <IconAvatar :name="entry.name" :pixel="36" />
        <div :class="$style.commentBody">
          <div :class="$style.commentMeta">
            <strong :title="entry.displayName">{{ entry.displayName }}</strong
            ><span :title="`@${entry.name}`">@{{ entry.name }}</span
            ><time :datetime="entry.createdAt">{{
              formatCommentTime(entry.createdAt)
            }}</time>
          </div>
          <p>{{ entry.body }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style module>
.comments {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.comments input {
  font-size: 12px;
}
.send {
  color: var(--color-border);
  display: flex;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}
.send svg {
  width: 24px;
  height: 24px;
}
.send:disabled {
  cursor: default;
}
.commentList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.comment {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.commentBody {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.commentMeta {
  display: flex;
  align-items: baseline;
  min-width: 0;
  gap: 4px;
}
.commentMeta strong,
.commentMeta span {
  min-width: 0;
  max-width: min-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.commentMeta strong {
  flex: 2;
}
.commentMeta span {
  flex: 1;
}
.commentMeta span,
.commentMeta time {
  color: var(--color-text-dimmed);
}
.commentMeta time {
  flex-shrink: 0;
  white-space: nowrap;
  margin-left: 4px;
}
.comments h2,
.comments p {
  margin: 0;
}
.comments h2 {
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
}
.comments button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
</style>
