import { type QRL, createContextId, type Signal } from "@builder.io/qwik";

export interface CuexConfig {
  fontSize: number;
  textAlign: "left" | "right" | "center" | "justify";
  lineHeight: number;
  flipX: boolean;
  flipY: boolean;
  speed: number;
  margin: number;
  status: "idle" | "running" | "paused";
}

export interface CuexStore {
  config: CuexConfig;
  scrollBoxRef: Signal<HTMLElement | undefined>;
  editorRef: Signal<HTMLElement | undefined>;
  update: QRL<(this: CuexStore, data: Partial<CuexConfig>) => void>;
  reset: QRL<(this: CuexStore) => void>;
  startOrResume: QRL<(this: CuexStore) => void>;
  pause: QRL<(this: CuexStore) => void>;
  scroll: QRL<(this: CuexStore) => void>;
  scrollInterval?: any;
  setEditorContent: QRL<(this: CuexStore, contents: string) => void>;
}

export const defaultConfig: CuexConfig = {
  fontSize: 60,
  textAlign: "left",
  lineHeight: 1.5,
  flipX: false,
  flipY: false,
  speed: 25,
  margin: 5,
  status: "idle",
};

export const CuexContext = createContextId<CuexStore>("cuex-state");
