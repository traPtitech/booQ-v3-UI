<template>
  <div class="box">
    <div class="left-box">
      <ServiceLogo />
    </div>
    <div class="right-box">
      <ChipCard :label="chipLabel" />
      <IconAvatar :name="userName" :pixel="36" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconAvatar from '@/shared/lib/components/IconAvatar.vue';
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import ServiceLogo from '@/shared/lib/components/ServiceLogo.vue';
const userName = 'Pugma'; // 実際は指定のユーザーの名前を取得する
const chipLabel = '物品を追加'; //ボタンのラベルをpropsで使えるようにして使いまわす
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 1px solid $color-secondary;
}

.left-box {
  margin-right: auto;
}

.right-box {
  display: flex;
  align-items: center;
  padding: 16px, 32px;
  gap: 16px;
}
</style>
