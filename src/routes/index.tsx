import type { DocumentHead } from "@builder.io/qwik-city";
import {
  $,
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { pick, keys, omit, merge } from "lodash";
import {
  defaultConfig,
  CuexContext,
  type CuexConfig,
  type CuexStore,
} from "~/components/cuex/context";
import { Editor } from "~/components/cuex/editor/editor";
import { Toolbar } from "~/components/cuex/toolbar/toolbar";

export default component$(() => {
  const scrollViewRef = useSignal<HTMLElement>();
  const cuex = useStore<CuexStore>({
    ref: scrollViewRef,
    config: defaultConfig,
    update: $(function (this, data) {
      this.config = merge(this.config, data);
      localStorage.setItem("config", JSON.stringify(this.config));
      if (data.speed) {
        const newInterval = setInterval(
          this.scroll.bind(this),
          51 - this.config.speed,
        );
        if (this.scrollInterval) {
          clearInterval(this.scrollInterval);
          this.scrollInterval = newInterval;
        }
      }
    }),
    reset: $(function (this) {
      this.update(defaultConfig);
      const editor = document.getElementById("cuex-editor");
      if (editor) {
        editor.innerHTML = "";
        editor.focus();
      }
    }),
    startOrResume: $(function (this) {
      if (this.config.status !== "running") {
        this.update({ status: "running" });
        this.scrollInterval = setInterval(
          this.scroll.bind(this),
          51 - this.config.speed,
        );
      }
    }),
    pause: $(function (this) {
      if (this.config.status !== "paused") {
        this.update({ status: "paused" });
        if (this.scrollInterval) {
          clearInterval(this.scrollInterval);
          this.scrollInterval = undefined;
        }
      }
    }),
    scroll: $(function (this) {
      if (this.config.status === "running" && this.ref.value) {
        const scrollTop = this.ref.value.scrollTop;
        const scrollHeight = this.ref.value.scrollHeight;
        const windowHeight = window.innerHeight;

        if (scrollTop + windowHeight - 63 >= scrollHeight) {
          this.ref.value.scrollTop = 0;
        } else {
          const currentScroll = this.ref.value.scrollTop;
          this.ref.value.scrollTop = currentScroll + 2;
        }
      }
    }),
  });

  useContextProvider(CuexContext, cuex);

  useVisibleTask$(() => {
    try {
      const raw = localStorage.getItem("config") || "{}";
      const stored = raw ? (JSON.parse(raw) as CuexConfig) : defaultConfig;
      const nextVal = pick(stored, omit(keys(stored), "play"));
      cuex.config = merge(cuex.config, nextVal);
    } catch (e) {
      cuex.config = defaultConfig;
    }
  });

  return (
    <div
      class="flex flex-col h-screen overflow-hidden"
      style={{
        transform:
          `rotateY(${cuex.config.flipX ? 180 : 0}deg)` +
          `rotateX(${cuex.config.flipY ? 180 : 0}deg)`,
      }}
    >
      <Editor ref={scrollViewRef} />
      <Toolbar />
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
