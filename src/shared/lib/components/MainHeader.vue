<template>
  <div class="box">
    <div class="leftbox">
      <ServiceLogo />
    </div>
    <div class="rightbox">
      <ChipCard :label="ChipLabel" />
      <IconAvatar :name="UserName" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconAvatar from '@/shared/lib/components/IconAvatar.vue';
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import ServiceLogo from '@/shared/lib/components/ServiceLogo.vue';
const UserName = 'Pugma'; // 実際は指定のユーザーの名前を取得する
const ChipLabel = '物品を追加'; //ボタンのラベルをpropsで使えるようにして使いまわす
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 1px solid $color-secondary;
}

.leftbox {
  margin-right: auto;
}

.rightbox {
  display: flex;
  align-items: center;
  padding: 16px, 32px;
  gap: 16px;
}
</style>
