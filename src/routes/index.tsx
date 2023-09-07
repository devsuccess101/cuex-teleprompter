import type { DocumentHead } from "@builder.io/qwik-city";
import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { pick, keys, merge, curry, set } from "lodash";
import {
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuFlipHorizontal,
  LuFlipVertical,
  LuPlay,
  LuPause,
} from "@qwikest/icons/lucide";
import styles from "./index.module.css";

interface Settings {
  fontSize: number;
  textAlign: "left" | "right" | "center" | "justify";
  lineHeight: number;
  flipX: boolean;
  flipY: boolean;
  speed: number;
  margin: number;
  play: boolean;
}

const initialState: Settings = {
  fontSize: 60,
  textAlign: "left",
  lineHeight: 1.5,
  flipX: false,
  flipY: false,
  speed: 10,
  margin: 5,
  play: false,
};

export default component$(() => {
  const interval = useSignal<any>(null);
  const s = useStore<{ settings: Settings }>({ settings: initialState });

  const reset = $(() => {
    s.settings = initialState;
    const el = document.querySelector("#teleprompter");
    if (el) {
      el.innerHTML = "";
    }
  });

  const change = curry((field: keyof Settings, value: any) => {
    return $((e: any) => {
      set(
        s.settings,
        field,
        value === undefined ? Number(e.target?.value) : value,
      );

      // Apply new speed if running
      if (field === "speed" && interval.value) {
        const scroll = () => {
          const el = document.querySelector("#teleprompter");
          if (el) {
            el.scrollTop += 1;
          }
        };
        const newInterval = setInterval(scroll, 51 - s.settings.speed);
        clearInterval(interval.value);
        interval.value = undefined;
        interval.value = newInterval;
      }
    });
  });

  const togglePlay = $(() => {
    const nextVal = !s.settings.play;
    const scroll = () => {
      const el = document.querySelector("#teleprompter");
      if (el) {
        el.scrollTop += 1;
      }
    };

    s.settings.play = nextVal;

    if (nextVal) {
      interval.value = setInterval(scroll, 51 - s.settings.speed);
    } else {
      clearInterval(interval.value);
      interval.value = null;
    }
  });

  useVisibleTask$(() => {
    try {
      const raw = localStorage.getItem("settings") || "{}";
      const stored = raw ? (JSON.parse(raw) as Settings) : initialState;
      const nextSettings = pick(stored, keys(s));
      s.settings = merge(s.settings, nextSettings);
    } catch (e) {
      s.settings = initialState;
    }
  });

  return (
    <div
      class={styles["wrapper"]}
      style={{
        transform:
          `rotateY(${s.settings.flipX ? 180 : 0}deg)` +
          `rotateX(${s.settings.flipY ? 180 : 0}deg)`,
      }}
    >
      <div class={styles["toolbar"]}>
        <div class="flex items-center">
          <div class={styles["toolbar-group"]}>
            <button type="button" title="Left">
              <LuAlignLeft
                class={styles["toolbar-icon"]}
                data-active={s.settings.textAlign === "left"}
                onClick$={change("textAlign", "left")}
              />
            </button>
            <button type="button" title="Center">
              <LuAlignCenter
                class={styles["toolbar-icon"]}
                data-active={s.settings.textAlign === "center"}
                onClick$={change("textAlign", "center")}
              />
            </button>
            <button type="button" title="Right">
              <LuAlignRight
                class={styles["toolbar-icon"]}
                data-active={s.settings.textAlign === "right"}
                onClick$={change("textAlign", "right")}
              />
            </button>
          </div>

          <div class={styles["toolbar-group"]}>
            <button type="button" title="Flip horizontal">
              <LuFlipHorizontal
                class={styles["toolbar-icon"]}
                data-active={s.settings.flipX}
                onClick$={change("flipX", !s.settings.flipX)}
              />
            </button>
            <button type="button" title="Flip vertical">
              <LuFlipVertical
                class={styles["toolbar-icon"]}
                data-active={s.settings.flipY}
                onClick$={change("flipY", !s.settings.flipY)}
              />
            </button>
          </div>

          <input
            type="range"
            title="Text size"
            min={20}
            max={180}
            value={s.settings.fontSize}
            class="w-full h-2 bg-white/80 rounded-lg appearance-none cursor-pointer mx-2"
            onInput$={change("fontSize", undefined)}
          />

          <input
            type="range"
            title="Margin"
            min={0}
            max={40}
            value={s.settings.margin}
            class="w-full h-2 bg-white/80 rounded-lg appearance-none cursor-pointer mx-2"
            onInput$={change("margin", undefined)}
          />

          <input
            type="range"
            title="Speed"
            min={1}
            max={50}
            value={s.settings.speed}
            class="w-full h-2 bg-white/80 rounded-lg appearance-none cursor-pointer mx-2"
            onInput$={change("speed", undefined)}
          />
        </div>

        <div class={styles["toolbar-group"]}>
          <button
            type="button"
            title={s.settings.play ? "Pause" : "Play"}
            onClick$={togglePlay}
          >
            {!s.settings.play ? (
              <LuPlay
                class={[styles["toolbar-icon"], styles["toolbar-icon-play"]]}
              />
            ) : (
              <LuPause
                class={[styles["toolbar-icon"], styles["toolbar-icon-pause"]]}
              />
            )}
          </button>
          <button
            type="button"
            class="text-red-500 mr-2 lg:ml-8"
            onClick$={reset}
          >
            Reset
          </button>
        </div>
      </div>

      <div
        id="teleprompter"
        class={styles["teleprompter"]}
        style={{
          fontSize: `${s.settings.fontSize}px`,
          textAlign: `${s.settings.textAlign}`,
          lineHeight: s.settings.lineHeight,
          paddingLeft: `${s.settings.margin}%`,
          paddingRight: `${s.settings.margin}%`,
        }}
        contentEditable="true"
        placeholder="Enter your text here..."
        {...{ autofocus: "true" }}
      >
        You can edit this text and it will scroll if you press the ` key to make
        it start and stop. If you need to change that key, you can simply update
        the keycode you want to use. I'm adding a bunch of text just to see what
        happens when I make this full page If you need to change that key, you
        can simply update the keycode you want to use. I'm adding a bunch of
        text just to see what happens when I make this full page If you need to
        change that key, you can simply update the keycode you want to use. I'm
        adding a bunch of text just to see what happens when I make this full
        page If you need to change that key, you can simply update the keycode
        you want to use. I'm adding a bunch of text just to see what happens
        when I make this full page If you need to change that key, you can
        simply update the keycode you want to use. I'm adding a bunch of text
        just to see what happens when I make this full page If you need to
        change that key, you can simply update the keycode you want to use. I'm
        adding a bunch of text just to see what happens when I make this full
        page If you need to change that key, you can simply update the keycode
        you want to use. I'm adding a bunch of text just to see what happens
        when I make this full page If you need to change that key, you can
        simply update the keycode you want to use. I'm adding a bunch of text
        just to see what happens when I make this full page If you need to
        change that key, you can simply update the keycode you want to use. I'm
        adding a bunch of text just to see what happens when I make this full
        page If you need to change that key, you can simply update the keycode
        you want to use. I'm adding a bunch of text just to see what happens
        when I make this full page If you need to change that key, you can
        simply update the keycode you want to use. I'm adding a bunch of text
        just to see what happens when I make this full page
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Free Teleprompter - CueX",
  meta: [
    {
      name: "description",
      content:
        "CueX is a free online teleprompter that runs on smartphones, tablets and desktops, making it your ideal companion for smooth and professional script delivery.",
    },
  ],
};
