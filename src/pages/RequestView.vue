<template>
  <div><MainHeader /></div>
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
        <TextInput
          :class="$style.input"
          placeholder="YYYY/MM/DD HH:mm"
          size="lg"
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
import RadioCard from '@/shared/components/RadioCard.vue';
import TextInput from '@/shared/components/TextInput.vue';
import ChipCard from '@/shared/lib/components/ChipCard.vue';
import MainHeader from '@/shared/lib/components/MainHeader.vue';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${year}年 ${month}月 ${day}日`;
};

let userName = 'すきゅう';
let itemName = 'まちカドまぞく 1巻';

let returnDate = new Date(2024, 1, 22);
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
    font-family: 'Mplus 1p Bold';
    font-weight: 700;
  }
}

.text {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;

  .datetime {
    color: var(--Primary-Color, #5cb860);
    font-family: 'Mplus 1p Bold';
    font-weight: 700;
  }
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  .input {
    // inputの幅を無理やり広げるための詳細度をあげたgrid
    display: grid;
  }
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
