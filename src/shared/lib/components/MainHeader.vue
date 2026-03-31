<template>
  <div
    class="flex items-center justify-between px-8 py-4 border-b border-(--color-secondary)"
  >
    <div class="mr-auto">
      <ServiceLogo />
    </div>
    <div class="flex items-center gap-4">
      <ChipCard :label="chipLabel" />
      <IconAvatar :name="userName" :pixel="36" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconAvatar from '@/shared/lib/components/IconAvatar.vue';
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import ServiceLogo from '@/shared/lib/components/ServiceLogo.vue';
const userName = 'o_ER4'; // 実際は指定のユーザーの名前を取得する
const chipLabel = '物品を追加'; //ボタンのラベルをpropsで使えるようにして使いまわす
</script>
