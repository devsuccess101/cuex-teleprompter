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
  const editorRef = useSignal<HTMLElement>();
  const cuex = useStore<CuexStore>({
    ref: editorRef,
    config: defaultConfig,
    update: $(function (this, data) {
      this.config = merge(this.config, data);
      localStorage.setItem("config", JSON.stringify(this.config));
    }),
    reset: $(function (this) {
      this.update(defaultConfig);
      if (this.ref.value) {
        this.ref.value.innerHTML = "";
        this.ref.value.focus();
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
      <Editor ref={editorRef} />
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
