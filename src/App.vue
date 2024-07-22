<template>
  <div :class="$style.container">
    <div :class="$style['inner-container']">
      <main :class="$style.content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.header {
  flex-shrink: 0;
}

.inner-container {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
  min-height: 0;
}

.content {
  flex: 1;

  overflow: {
    x: hidden;
    y: scroll;
  }
}
</style>
