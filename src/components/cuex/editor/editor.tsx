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
      id="cuex"
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
    />
  );
});
