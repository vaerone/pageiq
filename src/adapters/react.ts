import { useSyncExternalStore } from "react";
import { lifecycle } from "@pageiq/core/lifecycle-controller";
import type { LifecycleState } from "@pageiq/types";

function subscribe(notify: () => void) {
  lifecycle.start();

  const subs = [
    lifecycle.on("VISIBLE", notify),
    lifecycle.on("HIDDEN", notify),
    lifecycle.on("FOCUSED", notify),
    lifecycle.on("BLURRED", notify),
    lifecycle.on("PAGE_HIDE", notify),
    lifecycle.on("BF_CACHE_RESTORE", notify),
    lifecycle.on("FROZEN", notify),
    lifecycle.on("RESUMED", notify),
    lifecycle.on("ONLINE", notify),
    lifecycle.on("OFFLINE", notify),
    lifecycle.on("CONNECTION_CHANGE", notify),
    lifecycle.on("TAB_SYNC", notify),
  ];

  return () => subs.forEach((u) => u());
}

export function usePageLifecycle(): LifecycleState {
  const snapshot = () => lifecycle.getState();
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
