<script lang="ts" setup>
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import { getItem } from '@/apis/client';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const userName = route.params['userName'] as string;
const itemId = Number(route.params['itemId']);

let productTitle: string;
try {
  const { data } = await getItem({ itemId });
  productTitle = data.name;
} catch {
  // TODO: バックエンド接続後に削除
  productTitle = 'ダミー物品名';
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
