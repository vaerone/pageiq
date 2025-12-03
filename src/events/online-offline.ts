import { isBrowser } from "@pageiq/utils/is-browser";
import type { Dispatcher } from "@pageiq/core/dispatcher";

export function attachOnlineOffline(
  dispatcher: Dispatcher,
  abortSignal: AbortSignal,
) {
  if (!isBrowser) return;

  const up = () => dispatcher.emit("ONLINE", undefined);
  const down = () => dispatcher.emit("OFFLINE", undefined);

  window.addEventListener("online", up, { passive: true });
  window.addEventListener("offline", down, { passive: true });

  abortSignal.addEventListener(
    "abort",
    () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    },
    { once: true },
  );
}
