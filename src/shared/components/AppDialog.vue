<script setup lang="ts">
import { useId } from 'vue';
import Dialog from 'primevue/dialog';

const visible = defineModel<boolean>('visible', { default: false });
withDefaults(defineProps<{ closeOnEscape?: boolean }>(), {
  closeOnEscape: true,
});
const emit = defineEmits<{ show: []; afterHide: [] }>();
const titleId = useId();
</script>

<template>
  <Dialog
    v-model:visible="visible"
    unstyled
    modal
    block-scroll
    :closable="false"
    :draggable="false"
    :close-on-escape="closeOnEscape"
    :class="$style.dialog"
    :pt="{
      root: { 'aria-labelledby': titleId },
      mask: { class: $style.mask },
      header: { class: $style.header },
      content: { class: $style.content },
    }"
    @show="emit('show')"
    @after-hide="emit('afterHide')"
  >
    <template #header>
      <h2 :id="titleId" :class="$style.title"><slot name="title" /></h2>
    </template>
    <slot />
  </Dialog>
</template>

<style module>
.dialog {
  display: flex;
  flex-direction: column;
  width: min(720px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: 0 0 2px #00000040;
  text-align: left;
}
.mask {
  background: #000000b3;
}
.header {
  padding: 32px 32px 0;
}
.content {
  min-height: 0;
  padding: 32px;
  overflow-y: auto;
}
.title {
  margin: 0;
  font: inherit;
  font-size: 20px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
@media (max-width: 600px) {
  .header {
    padding: 24px 24px 0;
  }
  .content {
    padding: 24px;
  }
}
</style>
