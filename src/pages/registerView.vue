<template>
  <div :class="$style.wrapper">
    <div :class="$style.container">
      <div :class="$style.itemA">A</div>
      <div :class="$style.itemB">B</div>
      <div :class="$style.itemC">C</div>
    </div>
  </div>
  <RadioCard
    title="選択肢"
    content="選択肢選択肢選択肢選択肢選択肢選択肢選択肢選択肢"
    name="a"
    value="a"
  />
</template>

<script setup lang="ts">
import RadioCard from '@/shared/components/RadioCard.vue';
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.container {
  display: grid;
  width: 1024px;
  padding: 32px;
  grid-template-rows: 200px 120px;
  grid-template-columns: 160px 160px 160px 160px 160px 160px;
  border: 1px solid red;
}
.itemA {
  border: 1px solid orange;
  grid-column: 1 / span 3;
}
.itemB {
  border: 1px solid blue;
  grid-column: 4 / span 3;
}
.itemC {
  border: 1px solid green;
  grid-column: 1 / span 2;
  padding-top: 32px;
}
</style>
