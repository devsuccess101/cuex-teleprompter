import { type Signal, component$, useContext } from "@builder.io/qwik";
import { CuexContext } from "../context";
import styles from "./editor.module.css";

interface EditorProps {
  ref?: Signal<HTMLElement | undefined>;
}

export const Editor = component$<EditorProps>(({ ref }) => {
  const { config } = useContext(CuexContext);

  return (
    <div
      ref={ref}
      class={styles["cuex-editor-root"]}
      data-status={config.status}
    >
      <div
        id="cuex-editor"
        class={styles["cuex-editor"]}
        style={{
          fontSize: `${config.fontSize}px`,
          textAlign: `${config.textAlign}`,
          lineHeight: config.lineHeight,
          paddingLeft: `${config.margin}%`,
          paddingRight: `${config.margin}%`,
        }}
        contentEditable="true"
        placeholder="Enter your text here..."
        {...{ autofocus: "true" }}
      >
        {config.status !== "idle" && (
          <div contentEditable="false">
            <hr class="my-12" />
            <p class="h-screen">The end</p>
          </div>
        )}
      </div>
    </div>
  );
});
