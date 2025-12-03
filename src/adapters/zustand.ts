import { lifecycle } from "@pageiq/core/lifecycle-controller";

export function createLifecycleSlice(set: (fn: (s: any) => any) => void) {
  lifecycle.start();

  set(() => ({ lifecycle: lifecycle.getState() }));

  const subs = [
    lifecycle.on("VISIBLE", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("HIDDEN", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("FOCUSED", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("BLURRED", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("PAGE_HIDE", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("BF_CACHE_RESTORE", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("FROZEN", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("RESUMED", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("ONLINE", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("OFFLINE", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
    lifecycle.on("CONNECTION_CHANGE", () =>
      set(() => ({ lifecycle: lifecycle.getState() })),
    ),
  ];

  return {
    getLifecycle: () => lifecycle.getState(),
    _lifecycleUnsubscribeAll: () => subs.forEach((u) => u()),
  };
}
