<template>
  <div><MainHeader></MainHeader></div>
  <div :class="$style['svgContainer']">
    <img :src="returnSvg" alt="" :class="$style['svgImage']" />
  </div>
  <Suspense>
    <ReturnCheckContent />
    <template #fallback>
      <div :class="$style.container">
        <Skeleton width="6rem" height="1.2rem" style="display: inline-block" />
        さんに「<Skeleton
          width="8rem"
          height="1.2rem"
          style="display: inline-block"
        />」を返却しようとしています
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import MainHeader from '@/shared/lib/components/MainHeader.vue';
import Skeleton from 'primevue/skeleton';
import ReturnCheckContent from '@/shared/components/ReturnCheckContent.vue';
import returnSvg from '/return-icon.svg';
</script>

<style lang="scss" module>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
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

.svgContainer {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.svgImage {
  max-width: 150px;
  height: auto;
}

.cardContainer {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 40px 0;
}
</style>
