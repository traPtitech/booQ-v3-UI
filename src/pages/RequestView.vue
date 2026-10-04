<template>
  <div :class="$style.page">
    <div><AppHeader /></div>
    <div v-if="requestApproved === null" :class="$style.main">
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
            :max-date="maxHandoverDate"
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
          <ChipCard
            :class="$style.button"
            label="拒否"
            color="error"
            @click="requestApproved = false"
          />
          <ChipCard
            :class="$style.button"
            label="承認"
            color="primary"
            @click="requestApproved = true"
          />
        </div>
      </div>
    </div>
    <div v-else :class="$style.result" role="status">
      <Icon icon="mdi:check-circle" :class="$style.resultIcon" />
      <p :class="$style.resultMessage">
        リクエストを{{ requestApproved ? '承認' : '拒否' }}しました
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import DateTimePicker from '@/shared/components/DateTimePicker.vue';
import RadioCard from '@/shared/components/RadioCard.vue';
import AppHeader from '@/shared/components/AppHeader.vue';
import ChipCard from '@/shared/components/ChipCard.vue';

const requestApproved = ref<boolean | null>(null);

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${year}年 ${month}月 ${day}日`;
};

let userName = 'すきゅう';
let itemName = 'まちカドまぞく 1巻';

// API接続までは、返却予定日を今日から7日後とする。
const returnDate = new Date();
returnDate.setDate(returnDate.getDate() + 7);
returnDate.setHours(0, 0, 0, 0);
const maxHandoverDate = new Date(returnDate);
maxHandoverDate.setHours(23, 59, 59, 999);
const handoverDate = ref<Date | null>(null);
const HANDOVER_STEP_MINUTE = 5;
const handoverStepMilliseconds = HANDOVER_STEP_MINUTE * 60 * 1000;
const minHandoverDate = new Date(
  Math.ceil(Date.now() / handoverStepMilliseconds) * handoverStepMilliseconds,
);
</script>
<style lang="scss" module>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.result {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
  text-align: center;
}

.resultIcon {
  width: 170px;
  height: 170px;
  flex-shrink: 0;
  color: var(--color-primary);
}

.resultMessage {
  margin: 0;
  color: var(--color-text);
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
}

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
