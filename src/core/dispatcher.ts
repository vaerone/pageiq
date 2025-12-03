import type {
  LifecycleEvent,
  LifecycleCallback,
  LifecycleEventPayloadMap,
} from "@pageiq/types";

type ListenerMap = {
  [E in LifecycleEvent]?: Set<LifecycleCallback<E>>;
};

export class Dispatcher {
  private listeners: ListenerMap = {};

  on<E extends LifecycleEvent>(event: E, cb: LifecycleCallback<E>) {
    const set =
      (this.listeners[event] as Set<LifecycleCallback<E>> | undefined) ??
      new Set<LifecycleCallback<E>>();

    set.add(cb);
    this.listeners[event] = set as any;

    return () => this.off(event, cb);
  }

  off<E extends LifecycleEvent>(event: E, cb: LifecycleCallback<E>) {
    const set = this.listeners[event] as Set<LifecycleCallback<E>> | undefined;
    if (!set) return;
    set.delete(cb);
    if (set.size === 0) delete this.listeners[event];
  }

  emit<E extends LifecycleEvent>(
    event: E,
    payload: LifecycleEventPayloadMap[E],
  ) {
    const set = this.listeners[event] as Set<LifecycleCallback<E>> | undefined;
    if (!set) return;
    for (const cb of set) cb(payload);
  }
}
