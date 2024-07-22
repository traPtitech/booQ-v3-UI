<template>
  <div class="content">
    <div class="leftbox">
      <img
        src="/safari-pinned-tab.svg"
        alt="Safari Pinned Tab Icon"
        style="width: 40px; filter: brightness(70%)"
      />
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
const UserName = 'o_ER4'; // 実際は指定のユーザーの名前を取得する
const ChipLabel = '物品を追加'; //ボタンのラベルをpropsで使えるようにして使いまわす
</script>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.leftbox {
  margin-right: auto;
}

.rightbox {
  display: flex;
  align-items: center;
}
</style>
