import type { LifecycleState } from "../types";

export const createInitialState = (): LifecycleState => ({
  visibility:
    typeof document !== "undefined" && document.visibilityState === "visible"
      ? "visible"
      : "hidden",
  focused: typeof document !== "undefined" ? document.hasFocus() : false,
  frozen: false,
  online: typeof navigator !== "undefined" ? navigator.onLine : true,
  connection: null,
  lastEvent: null,
  timestamp: Date.now(),
});

export function patchState(
  s: LifecycleState,
  patch: Partial<LifecycleState>,
): LifecycleState {
  return { ...s, ...patch, timestamp: Date.now() };
}
