<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import AppHeader from '@/shared/components/AppHeader.vue';
import TextInput from '@/shared/components/TextInput.vue';
import bookCover from '@/assets/img/item-list-book.png';
import searchIcon from '@/assets/img/item-list-search.svg';
import helpIcon from '@/assets/img/item-list-help.svg';
import tooltipArrow from '@/assets/img/item-list-tooltip-arrow.svg';

const keyword = ref<string | undefined>('');
const showHelp = ref(false);
const helpId = useId();

// API 接続までは、Figma の表示に合わせた仮データを使用する。
const items = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: 'まちカドまぞく 1巻',
  imgUrl: bookCover,
  tags: ['漫画', 'まちカドまぞく'],
}));

const visibleItems = computed(() => {
  const terms = (keyword.value ?? '').trim().toLocaleLowerCase().split(/\s+/);

  return items.filter((item) =>
    terms.every((term) =>
      term.startsWith('tag:')
        ? item.tags.some((tag) =>
            tag.toLocaleLowerCase().includes(term.slice(4)),
          )
        : item.name.toLocaleLowerCase().includes(term),
    ),
  );
});
</script>

<template>
  <div :class="$style.page">
    <AppHeader />

    <section :class="$style.main" aria-label="物品一覧">
      <div :class="$style.content">
        <div :class="$style.searchRow" role="search" aria-label="物品を検索">
          <TextInput
            v-model="keyword"
            full-width
            placeholder="検索キーワードを入力"
            input-aria-label="検索キーワード"
            type="search"
          >
            <template #left>
              <img :src="searchIcon" alt="" aria-hidden="true" />
            </template>
          </TextInput>

          <div :class="$style.help" @mouseleave="showHelp = false">
            <button
              type="button"
              :class="$style.helpButton"
              aria-label="検索方法のヒント"
              :aria-describedby="helpId"
              @mouseenter="showHelp = true"
              @focus="showHelp = true"
              @blur="showHelp = false"
              @click="showHelp = true"
              @keydown.esc="showHelp = false"
            >
              <img :src="helpIcon" alt="" aria-hidden="true" />
            </button>
            <div
              v-show="showHelp"
              :id="helpId"
              :class="$style.tooltip"
              role="tooltip"
            >
              <img
                :src="tooltipArrow"
                :class="$style.tooltipArrow"
                alt=""
                aria-hidden="true"
              />
              hint: 「tag:○○」で○○というタグを含む物品のみに絞り込めます
            </div>
          </div>
        </div>

        <ul
          v-if="visibleItems.length"
          :class="$style.items"
          aria-label="検索結果"
        >
          <li v-for="item in visibleItems" :key="item.id" :class="$style.item">
            <img
              :src="item.imgUrl"
              :alt="`${item.name}の表紙`"
              :class="$style.cover"
              width="160"
              height="227"
            />
            <p :class="$style.itemName">{{ item.name }}</p>
          </li>
        </ul>
        <p v-else :class="$style.empty" role="status">
          条件に一致する物品がありません
        </p>
      </div>
    </section>
  </div>
</template>

<style module>
.page {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background: var(--color-background);
}

.main {
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 32px;
}

.content {
  display: flex;
  width: 100%;
  max-width: 960px;
  min-width: 0;
  flex-direction: column;
  gap: 32px;
  text-align: left;
}

.searchRow {
  display: flex;
  align-items: center;
  gap: 16px;
}

.help {
  position: relative;
  flex: 0 0 28px;
}

.helpButton {
  display: flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.helpButton:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.tooltip {
  position: absolute;
  z-index: 1;
  top: 35px;
  right: -8px;
  width: max-content;
  max-width: min(522px, calc(100vw - 64px));
  padding: 8px;
  background: var(--color-background);
  box-shadow: 0 1px 4px #00000026;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.tooltipArrow {
  position: absolute;
  right: 18px;
  bottom: calc(100% - 1.5px);
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  display: flex;
  width: 160px;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.cover {
  display: block;
  width: 160px;
  height: 227px;
  object-fit: cover;
}

.itemName {
  margin: 0;
  overflow-wrap: anywhere;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}

.empty {
  margin: 0;
  padding: 32px 0;
  color: var(--color-text-dimmed);
  text-align: center;
}

@media (max-width: 420px) {
  .main {
    padding: 24px 16px;
  }

  .items {
    column-gap: 16px;
  }

  .item {
    width: calc((100% - 16px) / 2);
  }

  .cover {
    width: 100%;
    height: auto;
    aspect-ratio: 160 / 227;
  }

  .tooltip {
    max-width: calc(100vw - 32px);
  }
}
</style>
