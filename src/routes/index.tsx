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
  LuX,
  LuAlertCircle,
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

      localStorage.setItem("settings", JSON.stringify(s.settings));

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
      const nextSettings = pick(stored, keys(s.settings));
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
      />

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
            min={30}
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
            data-modal-target="popup-modal"
            data-modal-toggle="popup-modal"
            class="text-red-500 mr-2 lg:ml-8"
            type="button"
          >
            Reset
          </button>

          <div
            tabIndex={-1}
            id="popup-modal"
            class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <LuX class="w-3 h-3" />
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                  <LuAlertCircle class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure that you want to delete your text and reset all
                    configurations to their defaults?
                  </h3>
                  <button
                    type="button"
                    data-modal-hide="popup-modal"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    onClick$={reset}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
