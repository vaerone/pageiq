import { isBrowser } from "@pageiq/utils/is-browser";
import type { Dispatcher } from "@pageiq/core/dispatcher";

export function attachFocus(dispatcher: Dispatcher, abortSignal: AbortSignal) {
  if (!isBrowser) return;

  const onFocus = () => dispatcher.emit("FOCUSED", undefined);
  const onBlur = () => dispatcher.emit("BLURRED", undefined);

  window.addEventListener("focus", onFocus, { passive: true });
  window.addEventListener("blur", onBlur, { passive: true });

  abortSignal.addEventListener(
    "abort",
    () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    },
    { once: true },
  );
}
