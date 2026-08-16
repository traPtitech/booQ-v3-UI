<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import ChipCard from '@/shared/components/ChipCard.vue';
import { getItem } from '@/apis/client';
import { useRoute, useRouter } from 'vue-router';
import returnImg from '/return-check.png';
import returnOkImg from '/return-ok.png';
import TextInput from '@/shared/components/TextInput.vue';
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
      <div class="mt-8 mb-2 flex justify-center">
        <img :src="returnImg" alt="" class="h-auto max-w-[150px]" />
      </div>
      <div
        class="mx-auto flex w-[calc(100%-2rem)] max-w-[720px] flex-col gap-8"
      >
        <p class="m-0 w-full text-left text-xl leading-[normal] text-black">
          <strong>{{ userName }}</strong> さんに「<strong>{{
            productTitle
          }}</strong
          >」を返却しようとしています
        </p>

        <label class="flex w-full flex-col items-start gap-2">
          <span class="text-base leading-[normal] text-(--color-text)">
            お礼メッセージ (任意)
          </span>
          <TextInput fluid placeholder="お礼メッセージを入力してください" />
        </label>

        <div class="flex w-full items-start gap-4">
          <ChipCard
            class="min-w-0 flex-1"
            color="secondary"
            label="キャンセル"
            @click="handleCancel"
          />
          <ChipCard
            class="min-w-0 flex-1"
            label="返却する"
            @click="handleReturn"
          >
            <template #right>
              <Icon icon="mdi:check" class="size-6" />
            </template>
          </ChipCard>
        </div>
      </div>
    </template>
  </div>
</template>
