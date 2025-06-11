<template>
  <div><MainHeader></MainHeader></div>
  <div :class="$style['svgContainer']">
    <img :src="returnSvg" alt="" :class="$style['svgImage']" />
  </div>
  <div>
    <div :class="$style.container">
      <strong v-if="userName">{{ userName }}</strong>
      <span v-else>ユーザー情報</span> さんに「<strong v-if="productTitle">{{
        productTitle
      }}</strong
      ><span v-else>物品情報</span>」を返却しようとしています
    </div>
    <div>
      <div :class="$style['cardContainer']">
        <ChipCard label="キャンセル" @click="handleCancel" />
        <ChipCard label="返却する" @click="handleReturn" color="primary" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import MainHeader from '@/shared/lib/components/MainHeader.vue';
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import returnSvg from '/returnicon.svg';
import { useRouter } from 'vue-router';

const router = useRouter();

const userName = ref<string>('');
const productTitle = ref<string>('');

async function fetchUserDataAndProduct() {
  try {
    userName.value = 'o_ER4 (API)';
    productTitle.value = 'Vue.js入門 (API)';
  } catch (error) {
    userName.value = '取得エラー';
    productTitle.value = '取得エラー';
  }
}

onMounted(() => {
  fetchUserDataAndProduct();
});

const handleCancel = () => {
  router.back(); 
};

const handleReturn = () => {
  router.push('/return-check/ok');
};
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
