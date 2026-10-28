<script setup lang="ts">
import { ref } from 'vue';
import { useHeightTransition } from '@/shared/composables/useHeightTransition';
import { Icon } from '@iconify/vue';
defineProps<{ text: string }>();
const expanded = defineModel<boolean>('expanded', { default: false });
const content = ref<HTMLElement | null>(null);
useHeightTransition(content, () => expanded.value);
</script>

<template>
  <div :class="$style.description">
    <div ref="content">
      <p :class="{ [$style.collapsed]: !expanded }">{{ text }}</p>
    </div>
    <button
      type="button"
      :class="$style.expand"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <Icon icon="mdi:chevron-down" :class="{ [$style.rotated]: expanded }" />
      {{ expanded ? '閉じる' : 'さらに表示' }}
    </button>
  </div>
</template>

<style module>
.description {
  color: var(--color-text-dimmed);
  font-size: 16px;
  line-height: 1.5;
}
.description p {
  margin: 0;
}
.collapsed {
  max-height: 72px;
  overflow: hidden;
  mask-image: linear-gradient(#000 24px, transparent 72px);
}
.expand {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0;
  padding: 4px 0 0;
  background: var(--color-background);
  color: inherit;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
.expand svg {
  width: 24px;
  height: 24px;
  transition: transform 240ms ease;
}
.rotated {
  transform: rotate(180deg);
}
.expand:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .expand svg {
    transition: none;
  }
}
</style>
