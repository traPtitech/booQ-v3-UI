<template>
  <div>
    <div class="header">
      <Iconavatar :name="dynamicName" />
    </div>
    <div class="content">
      <Chiptag :name="dynamicName2" />
    </div>
    <div class="content">
      <Chipcard></Chipcard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Iconavatar from '@/shared/lib/components/Iconavatar.vue';
import Chipcard from '@/shared/lib/components/Chipcard.vue';
import Chiptag from '@/shared/lib/components/Chiptag.vue';
const dynamicName = 'o_ER4'; // 実際は指定のユーザーの名前を取得する
const dynamicName2 = 'test1';
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
  background-color: white;
}

.content {
  padding: 20px;
}
</style>
