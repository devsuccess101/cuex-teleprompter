import { type QRL, createContextId, type Signal } from "@builder.io/qwik";

export interface CuexConfig {
  fontSize: number;
  textAlign: "left" | "right" | "center";
  lineHeight: number;
  flipX: boolean;
  flipY: boolean;
  speed: number;
  margin: number;
  play: boolean;
}

export interface CuexStore {
  config: CuexConfig;
  update: QRL<(this: CuexStore, data: Partial<CuexConfig>) => void>;
  reset: QRL<(this: CuexStore) => void>;
  ref: Signal<HTMLElement | undefined>;
}

export const defaultConfig: CuexConfig = {
  fontSize: 60,
  textAlign: "left",
  lineHeight: 1.5,
  flipX: false,
  flipY: false,
  speed: 10,
  margin: 5,
  play: false,
};

export const CuexContext = createContextId<CuexStore>("cuex-state");
