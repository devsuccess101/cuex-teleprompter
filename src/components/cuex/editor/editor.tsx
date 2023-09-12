import { component$, useContext } from "@builder.io/qwik";
import { CuexContext } from "../context";
import styles from "./editor.module.css";

export const Editor = component$(() => {
  const { config, scrollBoxRef, editorRef } = useContext(CuexContext);

  return (
    <div
      ref={scrollBoxRef}
      class={styles["cuex-editor-root"]}
      data-status={config.status}
    >
      <div
        ref={editorRef}
        class={styles["cuex-editor"]}
        style={{
          fontSize: `${config.fontSize}px`,
          textAlign: `${config.textAlign}`,
          lineHeight: config.lineHeight,
          paddingLeft: `${config.margin}%`,
          paddingRight: `${config.margin}%`,
        }}
        contentEditable={config.status !== "running" ? "true" : "false"}
        placeholder="Enter your text here..."
        {...{ autofocus: "true" }}
      />
    </div>
  );
});
