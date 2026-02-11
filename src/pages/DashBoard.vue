<template>
  <div><MainHeader></MainHeader></div>

  <div :class="$style.container">
    <div :class="$style.section">
      <h2 :class="$style.sectionTitle">借りている物品</h2>
      <div :class="$style.scrollContainer">
        <div
          v-for="(img, index) in borrowedItems"
          :key="index"
          :class="$style.itemCard"
        >
          <img :src="img.src" :alt="img.alt" :class="$style.image" />
          <div :class="$style.itemName">{{ img.name }}</div>
        </div>
      </div>
    </div>

    <div :class="$style.section">
      <h2 :class="$style.sectionTitle">貸している物品</h2>
      <div :class="$style.scrollContainer">
        <div
          v-for="(img, index) in lendingItems"
          :key="index"
          :class="$style.itemCard"
        >
          <img :src="img.src" :alt="img.alt" :class="$style.image" />
          <div :class="$style.itemName">{{ img.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '@/shared/lib/components/MainHeader.vue';

const borrowedItems = [
  { src: '/apple-touch-icon.png', alt: '借りている物品1', name: '物品1' },
  { src: '/favicon-32x32.png', alt: '借りている物品2', name: '物品2' },
  { src: '/safari-pinned-tab.svg', alt: '借りている物品3', name: '物品3' },
  { src: '/favicon-16x16.png', alt: '借りている物品4', name: '物品4' },
  { src: '/apple-touch-icon.png', alt: '借りている物品5', name: '物品5' },
];

const lendingItems = [
  { src: '/favicon-16x16.png', alt: '貸している物品1', name: '物品A' },
  { src: '/safari-pinned-tab.svg', alt: '貸している物品2', name: '物品B' },
  { src: '/apple-touch-icon.png', alt: '貸している物品3', name: '物品C' },
  { src: '/favicon-32x32.png', alt: '貸している物品4', name: '物品D' },
  { src: '/favicon-16x16.png', alt: '貸している物品5', name: '物品E' },
];
</script>

<style lang="scss" module>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.section {
  margin: 20px 0;
  text-align: center;
}

.sectionTitle {
  margin-bottom: 16px;
  font-size: 1.5rem;
  text-align: left;
}

.scrollContainer {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 16px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.itemCard {
  flex: 0 0 auto;
  text-align: center;
  border-radius: 8px;
  padding: 8px;
  background-color: var(--color-background);
  box-shadow: 0 2px 4px var(--color-background-dim);
}

.image {
  width: 160px;
  height: 227px;
  object-fit: contain;
  border-radius: 4px;
}

.itemName {
  margin-top: 8px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
