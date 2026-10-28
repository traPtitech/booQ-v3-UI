<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BorrowFormValues, ItemKind } from './types';
import AppDialog from '@/shared/components/AppDialog.vue';
import TextInput from '@/shared/components/TextInput.vue';
import DateTimePicker from '@/shared/components/DateTimePicker.vue';
import RadioCard from '@/shared/components/RadioCard.vue';
import ChipCard from '@/shared/components/ChipCard.vue';

const props = withDefaults(
  defineProps<{
    kind: ItemKind;
    title: string;
    owner?: string;
    submitting?: boolean;
    submitError?: string;
  }>(),
  { submitting: false, submitError: '' },
);
const visible = defineModel<boolean>('visible', { default: false });
const emit = defineEmits<{
  submit: [values: BorrowFormValues];
  afterHide: [];
}>();
const purpose = ref<string | undefined>('');
const returnDate = ref<Date | null>(null);
const method = ref<string | undefined>('room');
const error = ref('');
const minDate = ref(new Date());
const personal = computed(() => props.kind === 'personal');
const submitLabel = computed(() => (personal.value ? 'リクエスト' : '借りる'));

function submit() {
  if (props.submitting) return;
  if (!returnDate.value) {
    error.value = '返却日を選択してください';
    return;
  }
  error.value = '';
  emit('submit', {
    purpose: purpose.value?.trim() ?? '',
    returnDate: new Date(returnDate.value),
    method:
      personal.value && method.value === 'manual'
        ? 'manual'
        : personal.value
          ? 'room'
          : undefined,
  });
}

function reset() {
  minDate.value = new Date();
  minDate.value.setHours(0, 0, 0, 0);
  purpose.value = '';
  returnDate.value = null;
  method.value = 'room';
  error.value = '';
}
</script>

<template>
  <AppDialog
    v-model:visible="visible"
    :close-on-escape="!submitting"
    @show="reset"
    @after-hide="emit('afterHide')"
  >
    <template #title>
      <template v-if="personal"
        ><strong>@{{ owner }}</strong> さんに
        <strong>{{ title }}</strong> の貸し出しをリクエストします</template
      >
      <template v-else
        ><strong>「{{ title }}」</strong>を借りようとしています</template
      >
    </template>
    <form :aria-busy="submitting" @submit.prevent="submit">
      <fieldset :disabled="submitting" :class="$style.form">
        <div :class="$style.fields">
          <div :class="$style.field">
            <label for="borrow-purpose">借りる目的 (省略可)</label>
            <TextInput
              id="borrow-purpose"
              v-model="purpose"
              full-width
              placeholder="読むため"
            />
          </div>
          <div :class="$style.field">
            <label for="borrow-return-date">返却日</label>
            <DateTimePicker
              v-model="returnDate"
              input-id="borrow-return-date"
              :show-time="false"
              :min-date="minDate"
              :disabled="submitting"
              full-width
            />
            <p v-if="error" :class="$style.error" role="alert">{{ error }}</p>
          </div>
        </div>
        <div
          v-if="personal"
          :class="$style.methods"
          role="group"
          aria-label="受け取り方法"
        >
          <RadioCard
            v-model="method"
            name="borrow-method"
            value="room"
            title="部室で受け渡し"
            content="所有者に自動でリクエストが通知され、部室上で受け渡しを行います"
          />
          <RadioCard
            v-model="method"
            name="borrow-method"
            value="manual"
            title="手動で受け渡し"
            content="リクエストをした後に個別でやり取りを行って借りてください"
          />
        </div>
        <p v-if="submitError" :class="$style.error" role="alert">
          {{ submitError }}
        </p>
        <div :class="$style.actions">
          <ChipCard
            label="キャンセル"
            color="secondary"
            :disabled="submitting"
            @click="visible = false"
          />
          <ChipCard type="submit" :label="submitLabel" :loading="submitting" />
        </div>
      </fieldset>
    </form>
  </AppDialog>
</template>

<style module>
.form {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field label {
  font-weight: 700;
}
.methods {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.methods > * {
  display: grid;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
.error {
  margin: 0;
  color: var(--color-error);
  font-size: 14px;
}
@media (max-width: 600px) {
  .methods {
    grid-template-columns: 1fr;
  }
}
</style>
