<script lang="ts" setup>
import { ref } from 'vue';
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import { getItem } from '@/apis/client';
import { useRoute, useRouter } from 'vue-router';
import returnImg from '/return-check.png';
import returnOkImg from '/return-ok.png';

await new Promise((resolve) => setTimeout(resolve, 1500));

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

const returned = ref(false);

const handleCancel = () => router.back();
const handleReturn = () => {
  returned.value = true;
};
</script>

<template>
  <div>
    <div :class="$style.imgContainer">
      <img
        :src="returned ? returnOkImg : returnImg"
        alt=""
        :class="$style.imgImage"
      />
    </div>
    <template v-if="returned">
      <div :class="$style.container">返却されました</div>
    </template>
    <template v-else>
      <div :class="$style.container">
        <strong>{{ userName }}</strong> さんに「<strong>{{
          productTitle
        }}</strong
        >」を返却しようとしています
      </div>
      <div :class="$style.cardContainer">
        <ChipCard label="キャンセル" @click="handleCancel" />
        <ChipCard label="返却する" @click="handleReturn" />
      </div>
    </template>
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

.imgContainer {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.imgImage {
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
