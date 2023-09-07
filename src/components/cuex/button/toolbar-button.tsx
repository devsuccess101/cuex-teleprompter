import {
  type ClassList,
  type PropFunction,
  Slot,
  component$,
} from "@builder.io/qwik";
import styles from "./toolbar-button.module.css";

interface ToolbarIconProps {
  title: string;
  active?: boolean;
  class?: ClassList;
  onClick$?: PropFunction<() => void>;
}

export const ToolbarButton = component$<ToolbarIconProps>(
  ({ title, active, class: classes, onClick$, ...others }) => {
    return (
      <>
        <button
          type="button"
          title={title}
          data-active={active}
          class={[styles["toolbar-button"], classes]}
          onClick$={onClick$}
          {...others}
        >
          <Slot />
        </button>

        <Slot name="overlay" />
      </>
    );
  },
);
