import { type CuexConfig, CuexContext } from "../context";
import { type PropFunction, component$, useContext } from "@builder.io/qwik";
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuFlipHorizontal,
  LuFlipVertical,
  LuPause,
  LuPlay,
} from "@qwikest/icons/lucide";
import { Slide } from "../slide";
import { ToolbarButton } from "../button/toolbar-button";
import { ResetModal } from "../reset-modal";
import styles from "./toolbar.module.css";

interface ToolbarProps {
  onChange$?: PropFunction<(field: keyof CuexConfig, value: any) => void>;
}

export const Toolbar = component$<ToolbarProps>(({ onChange$ }) => {
  const cuex = useContext(CuexContext);

  return (
    <div class={styles["toolbar"]}>
      <div class="flex items-center">
        <div class="flex items-center sm:mx-4">
          <ToolbarButton
            title="Left"
            active={cuex.config.textAlign === "left"}
            onClick$={() => cuex.update({ textAlign: "left" })}
          >
            <LuAlignLeft />
          </ToolbarButton>
          <ToolbarButton
            title="Center"
            active={cuex.config.textAlign === "center"}
            onClick$={() => cuex.update({ textAlign: "center" })}
          >
            <LuAlignCenter />
          </ToolbarButton>
          <ToolbarButton
            title="Right"
            active={cuex.config.textAlign === "right"}
            onClick$={() => cuex.update({ textAlign: "right" })}
          >
            <LuAlignRight />
          </ToolbarButton>
        </div>

        <div class="flex items-center sm:mx-4">
          <ToolbarButton
            title="Flip horizontal"
            active={cuex.config.flipX}
            onClick$={() => cuex.update({ flipX: !cuex.config.flipX })}
          >
            <LuFlipHorizontal />
          </ToolbarButton>
          <ToolbarButton
            title="Flip vertical"
            active={cuex.config.flipY}
            onClick$={() => cuex.update({ flipY: !cuex.config.flipY })}
          >
            <LuFlipVertical />
          </ToolbarButton>
        </div>

        <Slide
          title="Text size"
          min={30}
          max={180}
          value={cuex.config.fontSize}
          onInput$={(e: any) =>
            cuex.update({ fontSize: Number(e.target?.value) })
          }
        />
        <Slide
          title="Margin"
          min={0}
          max={40}
          value={cuex.config.margin}
          onInput$={(e: any) =>
            cuex.update({ margin: Number(e.target?.value) })
          }
        />
        <Slide
          title="Speed"
          min={1}
          max={50}
          value={cuex.config.speed}
          onInput$={(e: any) => cuex.update({ speed: Number(e.target?.value) })}
        />
      </div>

      <div class="flex items-center sm:mx-4">
        <ToolbarButton
          title={cuex.config.play ? "Pause" : "Play"}
          onClick$={() => onChange$?.apply(this, ["play", !cuex.config.play])}
        >
          {!cuex.config.play ? (
            <LuPlay class="text-green-500 fill-green-500 hover:text-green-500 hover:fill-green-500" />
          ) : (
            <LuPause class="text-yellow-400 fill-yellow-400 hover:text-yellow-400 hover:fill-yellow-400" />
          )}
        </ToolbarButton>
        <ToolbarButton
          title="Reset"
          data-modal-target="reset-modal"
          data-modal-toggle="reset-modal"
          class="text-red-500 mr-2 lg:ml-8"
        >
          Reset
          <ResetModal q:slot="overlay" />
        </ToolbarButton>
      </div>
    </div>
  );
});
