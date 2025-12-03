import { LifecycleEventPayloadMap, LifecycleCallback } from "@pageiq/types";
import { lifecycle } from "@pageiq/core/lifecycle-controller";

export function onLifecycleEvent<E extends keyof LifecycleEventPayloadMap>(
  event: E,
  cb: LifecycleCallback<E>,
) {
  lifecycle.start();
  return lifecycle.on(event, cb);
}

export function getState() {
  lifecycle.start();
  return lifecycle.getState();
}
