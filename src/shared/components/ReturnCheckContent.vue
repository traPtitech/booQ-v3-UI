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
  <div
    :class="[
      'box-border min-h-0 w-full flex-1',
      {
        'flex flex-col items-center justify-start gap-2 px-8 pt-20 pb-8':
          returned,
      },
    ]"
  >
    <template v-if="returned">
      <img
        :src="returnOkImg"
        alt=""
        aria-hidden="true"
        class="h-auto max-h-[60vh] w-auto max-w-full shrink self-center object-contain"
      />
      <p
        class="m-0 whitespace-nowrap text-2xl leading-[normal] font-bold text-black"
      >
        返却しました
      </p>
    </template>
    <template v-else>
      <div class="my-10 flex justify-center">
        <img :src="returnImg" alt="" class="h-auto max-w-[150px]" />
      </div>
      <div class="mx-auto mt-5 max-w-[1200px] px-4 text-center text-[1.2rem]">
        <strong>{{ userName }}</strong> さんに「<strong>{{
          productTitle
        }}</strong
        >」を返却しようとしています
      </div>
      <div class="my-10 flex justify-center gap-6">
        <ChipCard color="secondary" label="キャンセル" @click="handleCancel" />
        <ChipCard label="返却する" @click="handleReturn" />
      </div>
    </template>
  </div>
</template>
