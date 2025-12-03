import { isBrowser } from "@pageiq/utils/is-browser";
import type { Dispatcher } from "@pageiq/core/dispatcher";

export function attachPagehideShow(
  dispatcher: Dispatcher,
  abortSignal: AbortSignal,
) {
  if (!isBrowser) return;

  const onPageHide = (ev: PageTransitionEvent) => {
    dispatcher.emit("PAGE_HIDE", { persisted: !!ev.persisted });
  };

  const onPageShow = (ev: PageTransitionEvent) => {
    if (ev.persisted) dispatcher.emit("BF_CACHE_RESTORE", undefined);
    else dispatcher.emit("VISIBLE", undefined);
  };

  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("pageshow", onPageShow);

  abortSignal.addEventListener(
    "abort",
    () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
    },
    { once: true },
  );
}
