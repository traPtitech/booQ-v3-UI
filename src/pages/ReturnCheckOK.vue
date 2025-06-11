<template>
  <div><MainHeader></MainHeader></div>
  <div :class="$style['svgContainer']">
    <img :src="returnSvg" alt="QR Code" :class="$style['svgImage']" />
  </div>
  <div>返却されました</div>
</template>

<script lang="ts" setup>
import MainHeader from '@/shared/lib/components/MainHeader.vue';
import returnSvg from '/mdi_check-circle.svg';

// APIが完成するまでのダミーデータ
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
  scrollbar-width: thin;
}

.itemCard {
  flex: 0 0 auto;
  text-align: center;
  border-radius: 8px;
  padding: 8px;
  background-color: $color-background;
  box-shadow: 0 2px 4px $color-background-dim;
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

.svgContainer {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.svgImage {
  max-width: 100%;
  height: auto;
}

.cardContainer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 20px 0;
}
</style>
