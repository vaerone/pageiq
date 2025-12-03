import { isBrowser } from "@pageiq/utils/is-browser";
import type { Dispatcher } from "@pageiq/core/dispatcher";

export function attachFreezeResume(
  dispatcher: Dispatcher,
  abortSignal: AbortSignal,
) {
  if (!isBrowser) return;

  const onFreeze = () => dispatcher.emit("FROZEN", undefined);
  const onResume = () => dispatcher.emit("RESUMED", undefined);

  const safeAdd = (name: string, handler: any) => {
    try {
      (document as any).addEventListener(name, handler);
    } catch {}
  };

  const safeRemove = (name: string, handler: any) => {
    try {
      (document as any).removeEventListener(name, handler);
    } catch {}
  };

  safeAdd("freeze", onFreeze);
  safeAdd("resume", onResume);

  abortSignal.addEventListener(
    "abort",
    () => {
      safeRemove("freeze", onFreeze);
      safeRemove("resume", onResume);
    },
    { once: true },
  );
}
