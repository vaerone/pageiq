export interface LifecycleEventPayloadMap {
  VISIBLE: undefined;
  HIDDEN: undefined;
  FOCUSED: undefined;
  BLURRED: undefined;

  PAGE_HIDE: { persisted: boolean };
  BF_CACHE_RESTORE: undefined;

  FROZEN: undefined;
  RESUMED: undefined;

  ONLINE: undefined;
  OFFLINE: undefined;

  CONNECTION_CHANGE: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };

  TAB_SYNC: {
    key: string | null;
    newValue: string | null;
    oldValue: string | null;
    url: string | null;
  };
}

export type LifecycleEvent = keyof LifecycleEventPayloadMap;

export type LifecycleCallback<E extends LifecycleEvent = LifecycleEvent> = (
  payload: LifecycleEventPayloadMap[E],
) => void;

export type LifecycleState = {
  visibility: "visible" | "hidden";
  focused: boolean;
  frozen: boolean;
  online: boolean;
  connection?: LifecycleEventPayloadMap["CONNECTION_CHANGE"] | null;
  lastEvent?: LifecycleEvent | null;
  timestamp: number;
};
