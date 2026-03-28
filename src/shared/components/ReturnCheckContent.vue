<script lang="ts" setup>
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const { userName, productTitle } = await fetchUserDataAndProduct();

async function fetchUserDataAndProduct() {
  return { userName: 'o_ER4', productTitle: 'Vue.js入門' };
}

const handleCancel = () => router.back();
const handleReturn = () => router.push('/return-check/ok');
</script>

<template>
  <div :class="$style.container">
    <strong>{{ userName }}</strong> さんに「<strong>{{ productTitle }}</strong
    >」を返却しようとしています
  </div>
  <div :class="$style.cardContainer">
    <ChipCard label="キャンセル" @click="handleCancel" />
    <ChipCard label="返却する" @click="handleReturn" />
  </div>
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

.cardContainer {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 40px 0;
}
</style>
