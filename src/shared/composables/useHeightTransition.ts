import {
  nextTick,
  onBeforeUnmount,
  watch,
  type Ref,
  type WatchSource,
} from 'vue';

// 開閉前後の実測値でアニメーションし、完了後は自然な高さに戻す。
export function useHeightTransition(
  element: Ref<HTMLElement | null>,
  expanded: WatchSource<boolean>,
) {
  let animation: Animation | undefined;
  let revision = 0;
  watch(expanded, async () => {
    const target = element.value;
    if (!target) return;
    const currentRevision = ++revision;
    const from = target.getBoundingClientRect().height;
    animation?.cancel();
    await nextTick();
    if (currentRevision !== revision || !element.value) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const to = target.getBoundingClientRect().height;
    animation = target.animate(
      [
        { height: `${from}px`, overflow: 'clip' },
        { height: `${to}px`, overflow: 'clip' },
      ],
      { duration: 240, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
    );
  });
  onBeforeUnmount(() => {
    revision++;
    animation?.cancel();
  });
}
