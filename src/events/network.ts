import { isBrowser } from "@pageiq/utils/is-browser";
import type { Dispatcher } from "@pageiq/core/dispatcher";

export function attachNetworkInfo(
  dispatcher: Dispatcher,
  abortSignal: AbortSignal,
) {
  if (!isBrowser) return;

  const nav = navigator as any;
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!conn) return;

  const handler = () => {
    dispatcher.emit("CONNECTION_CHANGE", {
      effectiveType: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
      saveData: conn.saveData,
    });
  };

  conn.addEventListener?.("change", handler);

  abortSignal.addEventListener(
    "abort",
    () => conn.removeEventListener?.("change", handler),
    { once: true },
  );
}
