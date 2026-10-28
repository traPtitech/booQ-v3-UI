import type { BorrowRequest } from './types';

// API接続時に置き換える。送信内容をそのまま返すモック。
export function mockBorrow(request: BorrowRequest, signal: AbortSignal) {
  return new Promise<BorrowRequest>((resolve, reject) => {
    signal.throwIfAborted();
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel);
      resolve(request);
    }, 1000);
    function cancel() {
      clearTimeout(timer);
      reject(signal.reason);
    }
    signal.addEventListener('abort', cancel, { once: true });
  });
}
