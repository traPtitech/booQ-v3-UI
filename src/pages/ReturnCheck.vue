<script lang="ts" setup>
import AppHeader from '@/shared/components/AppHeader.vue';
import Skeleton from 'primevue/skeleton';
import ReturnCheckContent from '@/shared/components/ReturnCheckContent.vue';
import returnImg from '/return-check.png';
</script>

<template>
  <div
    class="flex h-full min-h-0 w-full flex-col bg-[var(--color-background)],[font- family:'M_PLUS_1p']"
  >
    <div>
      <AppHeader />
    </div>

    <Suspense>
      <ReturnCheckContent />
      <template #fallback>
        <div class="min-h-0 flex-1">
          <div class="my-10 flex justify-center">
            <img :src="returnImg" alt="" class="h-auto max-w-[150px]" />
          </div>
          <div
            class="mx-auto mt-5 max-w-[1200px] px-4 text-center text-[1.2rem]"
          >
            <Skeleton width="80%" height="1.5rem" class="mx-auto my-2" />
            <Skeleton width="60%" height="1.5rem" class="mx-auto my-2" />
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>
