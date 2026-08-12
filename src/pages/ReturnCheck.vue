<script lang="ts" setup>
import AppHeader from '@/shared/components/AppHeader.vue';
import Skeleton from 'primevue/skeleton';
import ReturnCheckContent from '@/shared/components/ReturnCheckContent.vue';
import returnImg from '/return-check.png';
</script>

<template>
  <div :class="$style.page">
    <AppHeader />
    <Suspense>
      <ReturnCheckContent />
      <template #fallback>
        <div :class="$style.fallback">
          <div :class="$style.imgContainer">
            <img :src="returnImg" alt="" :class="$style.imgImage" />
          </div>
          <div :class="$style.container">
            <Skeleton />
            さんに「
            <Skeleton />
            」を返却しようとしています
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" module>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: var(--color-background);
  font-family: 'M PLUS 1p', 'Noto Sans JP', sans-serif;
}

.fallback {
  flex: 1;
  min-height: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
}

.imgContainer {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.imgImage {
  max-width: 150px;
  height: auto;
}
</style>
