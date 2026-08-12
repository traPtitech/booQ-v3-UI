<script lang="ts" setup>
import { ref } from 'vue';
import ChipCard from '@/shared/components/ChipCard.vue';
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
  <div :class="[$style.content, { [$style.successContent]: returned }]">
    <template v-if="returned">
      <img
        :src="returnOkImg"
        alt=""
        aria-hidden="true"
        :class="$style.successIcon"
      />
      <p :class="$style.successMessage">返却しました</p>
    </template>
    <template v-else>
      <div :class="$style.imgContainer">
        <img :src="returnImg" alt="" :class="$style.imgImage" />
      </div>
      <div :class="$style.container">
        <strong>{{ userName }}</strong> さんに「<strong>{{
          productTitle
        }}</strong
        >」を返却しようとしています
      </div>
      <div :class="$style.cardContainer">
        <ChipCard color="secondary" label="キャンセル" @click="handleCancel" />
        <ChipCard label="返却する" @click="handleReturn" />
      </div>
    </template>
  </div>
</template>
<style lang="scss" module>
.content {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  min-height: 0;
}

.successContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
}

.successIcon {
  max-width: fit-content;
  max-height: fit-content;
  align-self: center;
  flex-shrink: 0;
}

.successMessage {
  margin: 0;
  color: #000;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
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

.cardContainer {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 40px 0;
}
</style>
