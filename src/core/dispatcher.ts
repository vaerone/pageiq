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
    const set: Set<LifecycleCallback<E>> = this.listeners[event] ?? new Set();
    set.add(cb);
    this.listeners[event] = set as ListenerMap[E];

    return () => this.off(event, cb);
  }

  off<E extends LifecycleEvent>(event: E, cb: LifecycleCallback<E>) {
    const set: Set<LifecycleCallback<E>> | undefined = this.listeners[event];
    if (!set) return;

    set.delete(cb);
    if (set.size === 0) delete this.listeners[event];
  }

  emit<E extends LifecycleEvent>(
    event: E,
    payload: LifecycleEventPayloadMap[E],
  ) {
    const set: Set<LifecycleCallback<E>> | undefined = this.listeners[event];
    if (!set) return;

    for (const cb of set) cb(payload);
  }
}
