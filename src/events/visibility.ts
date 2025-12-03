import { isBrowser } from "@pageiq/utils/is-browser";
import type { Dispatcher } from "@pageiq/core/dispatcher";

export function attachVisibility(
  dispatcher: Dispatcher,
  abortSignal: AbortSignal,
) {
  if (!isBrowser) return;

  const handler = () => {
    if (document.visibilityState === "visible")
      dispatcher.emit("VISIBLE", undefined);
    else dispatcher.emit("HIDDEN", undefined);
  };

  document.addEventListener("visibilitychange", handler, { passive: true });

  abortSignal.addEventListener(
    "abort",
    () => document.removeEventListener("visibilitychange", handler),
    { once: true },
  );
}
