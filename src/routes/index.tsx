import type { DocumentHead } from "@builder.io/qwik-city";
import {
  $,
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { pick, keys, omit, assign } from "lodash";
import {
  defaultConfig,
  CuexContext,
  type CuexConfig,
  type CuexStore,
} from "~/components/cuex/context";
import { Editor } from "~/components/cuex/editor/editor";
import { Toolbar } from "~/components/cuex/toolbar/toolbar";

export default component$(() => {
  const scrollerRef = useSignal<HTMLElement>();
  const editorRef = useSignal<HTMLElement>();

  const cuex = useStore<CuexStore>({
    scrollBoxRef: scrollerRef,
    editorRef,
    config: defaultConfig,
    setEditorContent: $(function (this, contents: string) {
      if (this.editorRef.value) {
        this.editorRef.value.innerHTML = contents;
      }
    }),
    update: $(function (this, data) {
      this.config = assign(this.config, data);
      localStorage.setItem("config", JSON.stringify(this.config));

      if (data.status === "idle") {
        if (this.scrollInterval) {
          clearInterval(this.scrollInterval);
          this.scrollInterval = undefined;
          if (this.scrollBoxRef.value) {
            this.scrollBoxRef.value.scrollTop = 0;
          }
        }
      }

      if (data.speed && this.config.status === "running") {
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
      this.setEditorContent("");
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
      if (this.config.status === "running" && this.scrollBoxRef.value) {
        const scrollTop = this.scrollBoxRef.value.scrollTop;
        const scrollHeight = this.scrollBoxRef.value.scrollHeight;
        const windowHeight = window.innerHeight;

        if (scrollTop + windowHeight >= scrollHeight) {
          this.scrollBoxRef.value.scrollTop = 0;
        } else {
          const currentScroll = this.scrollBoxRef.value.scrollTop;
          this.scrollBoxRef.value.scrollTop = currentScroll + 2;
        }
      }
    }),
  });

  useContextProvider(CuexContext, cuex);

  useVisibleTask$(() => {
    try {
      const raw = localStorage.getItem("config") || "{}";
      const stored = raw ? (JSON.parse(raw) as CuexConfig) : defaultConfig;
      const nextVal = pick(stored, keys(omit(cuex.config, "status")));
      cuex.config = assign(cuex.config, nextVal);
    } catch (e) {
      cuex.config = defaultConfig;
    }
  });

  return (
    <div
      class="flex h-screen overflow-hidden flex-col relative"
      style={{
        // maxHeight: "-webkit-fill-available",
        transform:
          `rotateY(${cuex.config.flipX ? 180 : 0}deg)` +
          `rotateX(${cuex.config.flipY ? 180 : 0}deg)`,
      }}
    >
      <Toolbar />
      <Editor />
    </div>
  );
});

export const head: DocumentHead = ({ url }) => {
  return {
    title: "Free Teleprompter",
    meta: [
      {
        name: "description",
        content:
          "CueX is a free online teleprompter that runs on smartphones, tablets and desktops, making it your ideal companion for smooth and professional script delivery.",
      },
      {
        name: "og:title",
        content: "Free Online Teleprompter - Try CueX now!",
      },
      {
        name: "og:description",
        content:
          "CueX is a free online teleprompter that runs on smartphones, tablets and desktops, making it your ideal companion for smooth and professional script delivery.",
      },
      {
        name: "og:image",
        content: `${url.origin}/images/social-cover.jpg`,
      },
    ],
  };
};
