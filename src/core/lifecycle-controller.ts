import { Dispatcher } from "@pageiq/core/dispatcher";
import { createInitialState, patchState } from "@pageiq/core/state-machine";

import type {
  LifecycleState,
  LifecycleEvent,
  LifecycleCallback,
  LifecycleEventPayloadMap,
} from "@pageiq/types";

import { attachVisibility } from "@pageiq/events/visibility";
import { attachFocus } from "@pageiq/events/focus";
import { attachPagehideShow } from "@pageiq/events/pagehide-show";
import { attachFreezeResume } from "@pageiq/events/freeze-resume";
import { attachOnlineOffline } from "@pageiq/events/online-offline";
import { attachNetworkInfo } from "@pageiq/events/network";
import { attachStorage } from "@pageiq/events/storage";

export class LifecycleController {
  private dispatcher = new Dispatcher();
  private state: LifecycleState = createInitialState();
  private ac = new AbortController();
  private started = false;

  start() {
    if (this.started) return;
    this.started = true;

    const signal = this.ac.signal;

    attachVisibility(this.dispatcher, signal);
    attachFocus(this.dispatcher, signal);
    attachPagehideShow(this.dispatcher, signal);
    attachFreezeResume(this.dispatcher, signal);
    attachOnlineOffline(this.dispatcher, signal);
    attachNetworkInfo(this.dispatcher, signal);
    attachStorage(this.dispatcher, signal);

    this.dispatcher.on("VISIBLE", () => {
      this.state = patchState(this.state, {
        visibility: "visible",
        lastEvent: "VISIBLE",
      });
    });

    this.dispatcher.on("HIDDEN", () => {
      this.state = patchState(this.state, {
        visibility: "hidden",
        lastEvent: "HIDDEN",
      });
    });

    this.dispatcher.on("FOCUSED", () => {
      this.state = patchState(this.state, {
        focused: true,
        lastEvent: "FOCUSED",
      });
    });

    this.dispatcher.on("BLURRED", () => {
      this.state = patchState(this.state, {
        focused: false,
        lastEvent: "BLURRED",
      });
    });

    this.dispatcher.on("PAGE_HIDE", (payload) => {
      this.state = patchState(this.state, {
        visibility: "hidden",
        lastEvent: "PAGE_HIDE",
      });
    });

    this.dispatcher.on("BF_CACHE_RESTORE", () => {
      this.state = patchState(this.state, {
        visibility: "visible",
        lastEvent: "BF_CACHE_RESTORE",
      });
    });

    this.dispatcher.on("FROZEN", () => {
      this.state = patchState(this.state, {
        frozen: true,
        lastEvent: "FROZEN",
      });
    });

    this.dispatcher.on("RESUMED", () => {
      this.state = patchState(this.state, {
        frozen: false,
        lastEvent: "RESUMED",
      });
    });

    this.dispatcher.on("ONLINE", () => {
      this.state = patchState(this.state, {
        online: true,
        lastEvent: "ONLINE",
      });
    });

    this.dispatcher.on("OFFLINE", () => {
      this.state = patchState(this.state, {
        online: false,
        lastEvent: "OFFLINE",
      });
    });

    this.dispatcher.on("CONNECTION_CHANGE", (payload) => {
      this.state = patchState(this.state, {
        connection: payload,
        lastEvent: "CONNECTION_CHANGE",
      });
    });

    this.dispatcher.on("TAB_SYNC", () => {
      this.state = patchState(this.state, {
        lastEvent: "TAB_SYNC",
      });
    });
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    this.ac.abort();
    this.ac = new AbortController();
  }

  on<E extends LifecycleEvent>(event: E, cb: LifecycleCallback<E>) {
    return this.dispatcher.on(event, cb);
  }

  emit<E extends LifecycleEvent>(
    event: E,
    payload: LifecycleEventPayloadMap[E],
  ) {
    return this.dispatcher.emit(event, payload);
  }

  getState(): LifecycleState {
    return this.state;
  }
}

export const lifecycle = new LifecycleController();
