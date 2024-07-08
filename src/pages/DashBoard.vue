<template>
  <div>
    <div class="header">
      <chipCard></chipCard>
      <iconAvatar :name="dynamicName"></iconAvatar>
    </div>
    <div class="content">
      <div><v-divider></v-divider></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import iconAvatar from '@/components/iconAvatar.vue';
import chipCard from '@/components/chipCard.vue';
import { ref } from 'vue';
const dynamicName = 'o_ER4'; // 実際は指定のユーザーの名前を取得する
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: white; /* 必要に応じて背景色を調整 */
  z-index: 1000; /* 必要に応じてz-indexを調整 */
}

.content {
  margin-top: 60px; /* ヘッダーの高さに合わせて調整 */
  padding: 20px;
}
</style>
