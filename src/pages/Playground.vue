<template>
  <div :class="$style.page">
    <header :class="$style.hero">
      <div :class="$style.heroTop">
        <AppLogo />
        <span :class="$style.routeBadge">/playground</span>
      </div>
      <div :class="$style.heroContent">
        <div>
          <p :class="$style.eyebrow">DESIGN SYSTEM</p>
          <h1 :class="$style.title">Component Playground</h1>
          <p :class="$style.description">
            現在のコンポーネントの見た目・状態変化・イベントを確認するためのページです。
          </p>
        </div>
        <RouterLink to="/" :class="$style.backLink">
          ダッシュボードへ戻る
        </RouterLink>
      </div>
    </header>

    <main :class="$style.content">
      <nav aria-label="コンポーネント一覧" :class="$style.navigation">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          :class="$style.navigationLink"
        >
          {{ section.label }}
        </a>
      </nav>

      <section id="header" :class="$style.section">
        <div :class="$style.sectionHeading">
          <div>
            <p :class="$style.componentPath">AppHeader.vue</p>
            <h2 :class="$style.sectionTitle">Header</h2>
          </div>
          <span :class="$style.sectionNote">実サイズ</span>
        </div>
        <div :class="[$style.preview, $style.headerPreview]">
          <AppHeader />
        </div>
      </section>

      <section id="brand-icons" :class="$style.section">
        <div :class="$style.sectionHeading">
          <div>
            <p :class="$style.componentPath">
              AppLogo.vue / IconAvatar.vue / IconPlus.vue / IconClose.vue
            </p>
            <h2 :class="$style.sectionTitle">Brand & Icons</h2>
          </div>
          <span :class="$style.sectionNote">サイズ比較</span>
        </div>
        <div :class="[$style.preview, $style.brandGrid]">
          <div :class="$style.previewGroup">
            <p :class="$style.previewLabel">Logo</p>
            <div :class="$style.logoSurface">
              <AppLogo />
            </div>
          </div>
          <div :class="$style.previewGroup">
            <p :class="$style.previewLabel">Avatar</p>
            <div :class="$style.inlineItems">
              <div
                v-for="size in avatarSizes"
                :key="size"
                :class="$style.iconSample"
              >
                <IconAvatar name="o_ER4" :pixel="size" />
                <span>{{ size }} px</span>
              </div>
            </div>
          </div>
          <div :class="$style.previewGroup">
            <p :class="$style.previewLabel">Action icons</p>
            <div :class="$style.inlineItems">
              <button
                type="button"
                :class="$style.iconButton"
                aria-label="追加アイコンを試す"
                @click="recordEvent('IconPlus をクリック')"
              >
                <IconPlus />
              </button>
              <button
                type="button"
                :class="$style.iconButton"
                aria-label="閉じるアイコンを試す"
                @click="recordEvent('IconClose をクリック')"
              >
                <IconClose />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="text-input" :class="$style.section">
        <div :class="$style.sectionHeading">
          <div>
            <p :class="$style.componentPath">TextInput.vue</p>
            <h2 :class="$style.sectionTitle">Text Input</h2>
          </div>
          <span :class="$style.sectionNote">focus / input</span>
        </div>
        <div :class="$style.preview">
          <div :class="$style.inputGrid">
            <div
              v-for="inputSize in inputSizes"
              :key="inputSize"
              :class="$style.field"
            >
              <span :class="$style.previewLabel">size: {{ inputSize }}</span>
              <TextInput
                :size="inputSize"
                :placeholder="`${inputSize} テキストを入力`"
                :input-aria-label="`${inputSize} サイズのテキスト入力`"
                @focus="recordEvent(`TextInput / ${inputSize} にフォーカス`)"
                @update:model-value="handleTextInput($event, inputSize)"
              />
            </div>
            <div :class="$style.field">
              <span :class="$style.previewLabel">with slots</span>
              <TextInput
                size="md"
                placeholder="スロット付き"
                input-aria-label="スロット付きテキスト入力"
                @focus="recordEvent('TextInput / slots にフォーカス')"
                @update:model-value="handleTextInput($event, 'slots')"
              >
                <template #left>
                  <span :class="$style.inputAffix">Aa</span>
                </template>
                <template #right>
                  <IconClose />
                </template>
              </TextInput>
            </div>
          </div>
          <p :class="$style.liveValue">
            入力値:
            <strong>{{ textInputValue || '未入力' }}</strong>
          </p>
        </div>
      </section>

      <section id="radio-card" :class="$style.section">
        <div :class="$style.sectionHeading">
          <div>
            <p :class="$style.componentPath">RadioCard.vue</p>
            <h2 :class="$style.sectionTitle">Radio Card</h2>
          </div>
          <span :class="$style.sectionNote">hover / checked</span>
        </div>
        <div :class="$style.preview">
          <div :class="$style.radioGrid">
            <RadioCard
              v-for="option in radioOptions"
              :key="option.value"
              v-model="selectedRadio"
              :title="option.title"
              :content="option.content"
              name="playground-plan"
              :value="option.value"
            />
          </div>
          <p :class="$style.liveValue">
            選択中:
            <strong>{{ selectedRadio }}</strong>
          </p>
        </div>
      </section>

      <section id="checkbox" :class="$style.section">
        <div :class="$style.sectionHeading">
          <div>
            <p :class="$style.componentPath">CheckboxField.vue</p>
            <h2 :class="$style.sectionTitle">Checkbox</h2>
          </div>
          <span :class="$style.sectionNote">checked / disabled</span>
        </div>
        <div :class="$style.preview">
          <div :class="$style.inlineItems">
            <CheckboxField v-model="checkboxUnchecked">
              未チェック始まり
            </CheckboxField>
            <CheckboxField v-model="checkboxChecked">
              チェック済み始まり
            </CheckboxField>
            <CheckboxField model-value disabled>disabled</CheckboxField>
          </div>
        </div>
      </section>

      <section id="chips" :class="$style.section">
        <div :class="$style.sectionHeading">
          <div>
            <p :class="$style.componentPath">
              ChipCard.vue / ChipButton.vue / ChipTag.vue
            </p>
            <h2 :class="$style.sectionTitle">Chips</h2>
          </div>
          <span :class="$style.sectionNote">variant / click</span>
        </div>
        <div :class="$style.preview">
          <div :class="$style.previewGroup">
            <p :class="$style.previewLabel">Button variants（ChipCard.vue）</p>
            <div :class="$style.inlineItems">
              <div
                :class="$style.inlineControl"
                @click="recordEvent('ChipCard / primary をクリック')"
              >
                <ChipCard label="ボタン" color="primary" />
              </div>
              <div
                :class="$style.inlineControl"
                @click="recordEvent('ChipCard / secondary をクリック')"
              >
                <ChipCard label="ボタン" color="secondary" />
              </div>
              <div
                :class="$style.inlineControl"
                @click="recordEvent('ChipCard / error をクリック')"
              >
                <ChipCard label="ボタン" color="error" />
              </div>
            </div>
          </div>

          <div :class="$style.previewGroup">
            <p :class="$style.previewLabel">Chip variants</p>
            <div :class="$style.inlineItems">
              <ChipButton
                label="チップ"
                type="default"
                @action="recordEvent('ChipButton / default action')"
              />
              <ChipButton
                label="チップ"
                type="show-close"
                @action="recordEvent('ChipButton / closable action')"
                @close="recordEvent('ChipButton / close')"
              />
              <ChipButton
                label="チップを追加"
                type="new"
                @action="recordEvent('ChipButton / new action')"
              />
            </div>
          </div>
        </div>
      </section>

      <aside aria-live="polite" :class="$style.eventPanel">
        <div>
          <p :class="$style.eventLabel">LAST EVENT</p>
          <p :class="$style.eventMessage">{{ lastEvent }}</p>
        </div>
        <span :class="$style.eventCount">{{ eventCount }}</span>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import AppHeader from '@/shared/components/AppHeader.vue';
import AppLogo from '@/shared/components/AppLogo.vue';
import CheckboxField from '@/shared/components/CheckboxField.vue';
import ChipButton from '@/shared/components/ChipButton.vue';
import ChipCard from '@/shared/components/ChipCard.vue';
import IconAvatar from '@/shared/components/IconAvatar.vue';
import IconClose from '@/shared/components/IconClose.vue';
import IconPlus from '@/shared/components/IconPlus.vue';
import RadioCard from '@/shared/components/RadioCard.vue';
import TextInput from '@/shared/components/TextInput.vue';

defineOptions({
  name: 'ComponentPlayground',
});

const sections = [
  { id: 'header', label: 'Header' },
  { id: 'brand-icons', label: 'Brand & Icons' },
  { id: 'text-input', label: 'Text Input' },
  { id: 'radio-card', label: 'Radio Card' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'chips', label: 'Chips' },
];

const avatarSizes = [32, 36, 64];
const inputSizes = ['md'] as const;
const radioOptions = [
  {
    title: 'Compact',
    content: '必要な情報だけを表示するコンパクトな選択肢です。',
    value: 'compact',
  },
  {
    title: 'Standard',
    content: '通常の情報量で表示する基本の選択肢です。',
    value: 'standard',
  },
  {
    title: 'Detailed',
    content: '補足情報を含めて詳しく表示する選択肢です。',
    value: 'detailed',
  },
];

const selectedRadio = ref<string | undefined>('standard');
const checkboxUnchecked = ref(false);
const checkboxChecked = ref(true);
const textInputValue = ref('');
const lastEvent = ref(
  'コンポーネントを操作すると、ここにイベントが表示されます',
);
const eventCount = ref(0);

const recordEvent = (message: string) => {
  lastEvent.value = message;
  eventCount.value += 1;
};

const handleTextInput = (
  value: string | undefined,
  size: (typeof inputSizes)[number] | 'slots',
) => {
  textInputValue.value = value ?? '';
  recordEvent(`TextInput / ${size}: "${textInputValue.value}"`);
};

watch(selectedRadio, (value) => {
  recordEvent(`RadioCard / ${value} を選択`);
});

watch(checkboxUnchecked, (value) => {
  recordEvent(
    `CheckboxField / 未チェック始まり を ${value ? 'チェック' : '未チェック'} に`,
  );
});

watch(checkboxChecked, (value) => {
  recordEvent(
    `CheckboxField / チェック済み始まり を ${value ? 'チェック' : '未チェック'} に`,
  );
});
</script>

<style module>
.page {
  min-height: 100%;
  background:
    radial-gradient(
      circle at 10% 0%,
      color-mix(in srgb, var(--color-primary) 12%, transparent),
      transparent 28rem
    ),
    var(--color-secondary-container);
  color: var(--color-text);
  text-align: left;
}

.hero {
  padding: 28px max(24px, calc((100% - 1120px) / 2));
  border-bottom: 1px solid var(--color-secondary);
  background: color-mix(in srgb, var(--color-background) 88%, transparent);
}

.heroTop,
.heroContent,
.sectionHeading,
.inlineItems,
.eventPanel {
  display: flex;
  align-items: center;
}

.heroTop {
  justify-content: space-between;
}

.routeBadge {
  padding: 5px 10px;
  border: 1px solid var(--color-secondary);
  border-radius: 999px;
  color: var(--color-text-dimmed);
  background: var(--color-background);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}

.heroContent {
  justify-content: space-between;
  gap: 32px;
  margin-top: 48px;
  margin-bottom: 12px;
}

.eyebrow,
.componentPath,
.eventLabel {
  margin: 0;
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.title {
  margin: 6px 0 10px;
  font-size: clamp(34px, 6vw, 58px);
  line-height: 1;
  letter-spacing: -0.04em;
}

.description {
  max-width: 620px;
  margin: 0;
  color: var(--color-text-dimmed);
  line-height: 1.7;
}

.backLink {
  flex-shrink: 0;
  padding: 10px 14px;
  border: 1px solid var(--color-secondary);
  border-radius: 8px;
  color: var(--color-text);
  background: var(--color-background);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.backLink:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-1px);
}

.content {
  width: min(1120px, calc(100% - 48px));
  margin: 0 auto;
  padding: 26px 0 120px;
}

.navigation {
  position: sticky;
  z-index: 20;
  top: 12px;
  display: flex;
  overflow-x: auto;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto 48px;
  padding: 8px;
  border: 1px solid var(--color-secondary);
  border-radius: 14px;
  background: color-mix(in srgb, var(--color-background) 90%, transparent);
  box-shadow: 0 8px 30px rgb(0 0 0 / 7%);
  backdrop-filter: blur(12px);
}

.navigationLink {
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--color-text-dimmed);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.navigationLink:hover {
  color: var(--color-primary);
  background: var(--color-primary-hover);
}

.section {
  scroll-margin-top: 88px;
  margin-bottom: 54px;
}

.sectionHeading {
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 14px;
}

.componentPath {
  color: var(--color-text-dimmed);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  letter-spacing: 0;
}

.sectionTitle {
  margin: 3px 0 0;
  font-size: 25px;
  letter-spacing: -0.02em;
}

.sectionNote {
  color: var(--color-text-disabled);
  font-size: 12px;
}

.preview {
  padding: 28px;
  border: 1px solid var(--color-secondary);
  border-radius: 16px;
  background:
    linear-gradient(90deg, rgb(0 0 0 / 2%) 1px, transparent 1px),
    linear-gradient(rgb(0 0 0 / 2%) 1px, transparent 1px),
    var(--color-background);
  background-size: 20px 20px;
  box-shadow: 0 12px 36px rgb(26 26 28 / 5%);
}

.headerPreview {
  overflow: hidden;
  padding: 0;
}

.brandGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.previewGroup + .previewGroup {
  margin-top: 32px;
}

.brandGrid .previewGroup + .previewGroup {
  margin-top: 0;
}

.previewLabel {
  display: block;
  margin: 0 0 12px;
  color: var(--color-text-dimmed);
  font-size: 12px;
  font-weight: 700;
}

.logoSurface {
  display: inline-flex;
  padding: 14px;
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  background: var(--color-background);
}

.inlineItems {
  flex-wrap: wrap;
  gap: 16px;
}

.inlineControl {
  display: inline-flex;
}

.iconSample {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-text-dimmed);
  font-size: 11px;
}

.iconButton {
  display: grid;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  place-items: center;
  background: var(--color-background);
  cursor: pointer;
  transition:
    background-color 160ms ease,
    transform 160ms ease;
}

.iconButton:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
}

.inputGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.inputAffix {
  padding-left: 8px;
  color: var(--color-text-dimmed);
  font-size: 12px;
  font-weight: 800;
}

.liveValue {
  margin: 24px 0 0;
  color: var(--color-text-dimmed);
  font-size: 13px;
}

.liveValue strong {
  color: var(--color-text);
}

.radioGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.eventPanel {
  position: fixed;
  z-index: 30;
  right: 24px;
  bottom: 24px;
  justify-content: space-between;
  gap: 28px;
  width: min(410px, calc(100% - 48px));
  padding: 14px 16px;
  border: 1px solid color-mix(in srgb, var(--color-primary) 45%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, var(--color-background) 94%, transparent);
  box-shadow: 0 12px 40px rgb(26 26 28 / 16%);
  backdrop-filter: blur(16px);
}

.eventMessage {
  overflow: hidden;
  max-width: 320px;
  margin: 3px 0 0;
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.eventCount {
  display: grid;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  place-items: center;
  color: var(--color-background);
  background: var(--color-primary);
  font-size: 12px;
  font-weight: 800;
}

@media (max-width: 760px) {
  .hero {
    padding: 22px 24px;
  }

  .heroContent {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 36px;
  }

  .content {
    width: min(100% - 32px, 1120px);
  }

  .brandGrid,
  .inputGrid,
  .radioGrid {
    grid-template-columns: 1fr;
  }

  .brandGrid .previewGroup + .previewGroup {
    margin-top: 8px;
  }

  .preview {
    padding: 20px;
  }

  .headerPreview {
    padding: 0;
  }

  .sectionHeading {
    align-items: flex-end;
  }

  .sectionNote {
    text-align: right;
  }

  .eventPanel {
    right: 16px;
    bottom: 16px;
    width: calc(100% - 32px);
  }
}
</style>
