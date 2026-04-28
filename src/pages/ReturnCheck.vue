<script lang="ts" setup>
import MainHeader from '@/shared/lib/components/MainHeader.vue';
import Skeleton from 'primevue/skeleton';
import ReturnCheckContent from '@/shared/components/ReturnCheckContent.vue';
import returnSvg from '/return-icon.svg';
</script>

<template>
  <div><MainHeader></MainHeader></div>
  <Suspense>
    <ReturnCheckContent />
    <template #fallback>
      <div>
        <div :class="$style.svgContainer">
          <img :src="returnSvg" alt="" :class="$style.svgImage" />
        </div>
        <div :class="$style.container">
          <Skeleton
          />
          さんに「
          <Skeleton
          />
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

.svgContainer {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.svgImage {
  max-width: 150px;
  height: auto;
}
</style>
