<template>
  <div><MainHeader></MainHeader></div>
  <div :class="$style['svgContainer']">
    <img :src="returnSvg" alt="QR Code" :class="$style['svgImage']" />
  </div>
  <div>返却されました</div>
</template>

<script lang="ts" setup>
import MainHeader from '@/shared/lib/components/MainHeader.vue';
import returnSvg from '/return-ok.svg';

// APIが完成するまでのダミーデータ
</script>

<style lang="scss" module>
.svgContainer {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.svgImage {
  max-width: 100%;
  height: auto;
}
</style>