<template>
  <div><AppHeader /></div>
  <div :class="$style.main">
    <div :class="$style.header" />
    <div :class="$style.wrapper">
      <div :class="$style.message">
        <span :class="$style.bold">{{ userName }}</span> さんから「<span
          :class="$style.bold"
          >{{ itemName }}</span
        >」を借りたいというリクエストが来ています
      </div>

      <div :class="$style.section">
        <h2 :class="$style.text">返却予定日</h2>
        <div :class="$style.text">
          <span :class="$style.datetime">{{ formatDate(returnDate) }}</span>
          までに返却される予定です
        </div>
      </div>
      <div :class="$style.section">
        <h2 :class="$style.text">受け渡し日時設定</h2>
        <DateTimePicker
          v-model="handoverDate"
          :min-date="minHandoverDate"
          :step-minute="HANDOVER_STEP_MINUTE"
          full-width
          input-aria-label="受け渡し日時"
        />
      </div>
      <div :class="$style.section">
        <h2 :class="$style.text">受け取り方法</h2>
        <div :class="$style.card_wrapper">
          <RadioCard
            :class="$style.card"
            name="method"
            value="room"
            title="部室で受け渡し"
            content="承認した後に部室で受け渡してください"
          />
          <RadioCard
            :class="$style.card"
            name="method"
            value="manual"
            title="手動で受け渡し"
            content="承認した後に個別でやり取りして受け渡しを行ってください"
          />
        </div>
      </div>
      <div :class="$style.button_wrapper">
        <ChipCard :class="$style.button" label="拒否" color="error" />
        <ChipCard :class="$style.button" label="承認" color="primary" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import DateTimePicker from '@/shared/components/DateTimePicker.vue';
import RadioCard from '@/shared/components/RadioCard.vue';
import AppHeader from '@/shared/components/AppHeader.vue';
import ChipCard from '@/shared/components/ChipCard.vue';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${year}年 ${month}月 ${day}日`;
};

let userName = 'すきゅう';
let itemName = 'まちカドまぞく 1巻';

let returnDate = new Date(2024, 1, 22);
const handoverDate = ref<Date | null>(null);
const HANDOVER_STEP_MINUTE = 5;
const handoverStepMilliseconds = HANDOVER_STEP_MINUTE * 60 * 1000;
const minHandoverDate = new Date(
  Math.ceil(Date.now() / handoverStepMilliseconds) * handoverStepMilliseconds,
);
</script>
<style lang="scss" module>
.main {
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  text-align: left;
}

.header {
  width: 101px;
  height: 101px;
  background: url('../assets/img/requestpage.webp') -32px -34px / 164.356%
    164.356% no-repeat;
}

.wrapper {
  display: flex;
  max-width: 720px;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
}

.message {
  font-size: 20px;
  font-weight: 500;
  line-height: normal;

  .bold {
    font-weight: 700;
  }
}

.text {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;

  .datetime {
    color: var(--color-primary);
    font-weight: 700;
  }
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.card_wrapper {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.card {
  flex: 1 0 0;
  // カードの大きさをそろえるためのgrid
  display: grid;
}

.button_wrapper {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.button {
  justify-content: center;
  flex: 1 0 0;
}
</style>
