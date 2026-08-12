<script lang="ts" setup>
import AppHeader from '@/shared/components/AppHeader.vue';
import Skeleton from 'primevue/skeleton';
import ReturnCheckContent from '@/shared/components/ReturnCheckContent.vue';
import returnImg from '/return-check.png';
</script>

<template>
  <AppHeader />
  <Suspense>
    <ReturnCheckContent />
    <template #fallback>
      <div>
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
</template>

<style lang="scss" module>
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
