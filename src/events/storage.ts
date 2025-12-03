import { isBrowser } from "@pageiq/utils/is-browser";
import type { Dispatcher } from "@pageiq/core/dispatcher";

export function attachStorage(
  dispatcher: Dispatcher,
  abortSignal: AbortSignal,
) {
  if (!isBrowser) return;

  const handler = (ev: StorageEvent) =>
    dispatcher.emit("TAB_SYNC", {
      key: ev.key,
      newValue: ev.newValue,
      oldValue: ev.oldValue,
      url: ev.url,
    });

  window.addEventListener("storage", handler);

  abortSignal.addEventListener(
    "abort",
    () => window.removeEventListener("storage", handler),
    { once: true },
  );
}
