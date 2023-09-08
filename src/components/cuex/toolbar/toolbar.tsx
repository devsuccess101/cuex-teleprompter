import { CuexContext } from "../context";
import { component$, useContext } from "@builder.io/qwik";
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuFlipHorizontal,
  LuFlipVertical,
  LuMoveHorizontal,
  LuPause,
  LuPlay,
  LuRefreshCcw,
  LuSquare,
  LuType,
  LuZap,
} from "@qwikest/icons/lucide";
import { Slide } from "../slide";
import { ToolbarButton } from "../button/toolbar-button";
import { ResetModal } from "../reset-modal";
import styles from "./toolbar.module.css";

export const Toolbar = component$(() => {
  const cuex = useContext(CuexContext);

  return (
    <div class={styles["toolbar"]}>
      <div class="flex items-center">
        <ToolbarButton
          title="Reset"
          data-modal-target="reset-modal"
          data-modal-toggle="reset-modal"
          class="text-red-500 md:mr-8"
        >
          <LuRefreshCcw />
          <ResetModal q:slot="overlay" />
        </ToolbarButton>

        <ToolbarButton
          title="Text align"
          data-popover-target="text-align-panel"
          data-popover-trigger="click"
        >
          {cuex.config.textAlign === "left" && <LuAlignLeft />}
          {cuex.config.textAlign === "center" && <LuAlignCenter />}
          {cuex.config.textAlign === "right" && <LuAlignRight />}
          {cuex.config.textAlign === "justify" && <LuAlignJustify />}

          <div
            q:slot="overlay"
            id="text-align-panel"
            data-popover
            role="tooltip"
            class={[
              "absolute z-10 invisible inline-block w-50 text-sm text-gray-500",
              "transition-opacity duration-300 bg-white",
              "border border-gray-200 rounded-lg shadow-sm opacity-0",
            ]}
          >
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Text align{" "}
                <span class="capitalize">({cuex.config.textAlign})</span>
              </h3>
            </div>
            <div class="py-2 flex items-center justify-center sm:mx-4">
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
              <ToolbarButton
                title="Justify"
                active={cuex.config.textAlign === "justify"}
                onClick$={() => cuex.update({ textAlign: "justify" })}
              >
                <LuAlignJustify />
              </ToolbarButton>
            </div>
            <div data-popper-arrow></div>
          </div>
        </ToolbarButton>

        <ToolbarButton title="Font size">
          <LuType
            data-popover-target="font-size-panel"
            data-popover-trigger="click"
            class="outline-none"
          />
          <div
            q:slot="overlay"
            id="font-size-panel"
            data-popover
            role="tooltip"
            class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0"
          >
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Font size ({cuex.config.fontSize}px)
              </h3>
            </div>
            <div class="py-4 flex justify-center items-center">
              <Slide
                title="Font size"
                min={30}
                max={180}
                value={cuex.config.fontSize}
                onInput$={(e: any) =>
                  cuex.update({ fontSize: Number(e.target?.value) })
                }
              />
            </div>
            <div data-popper-arrow></div>
          </div>
        </ToolbarButton>

        <ToolbarButton title="Margin">
          <LuMoveHorizontal
            data-popover-target="margin-panel"
            data-popover-trigger="click"
            class="outline-none"
          />
          <div
            q:slot="overlay"
            id="margin-panel"
            data-popover
            role="tooltip"
            class={[
              "absolute z-10 invisible inline-block w-64 text-sm text-gray-500",
              "transition-opacity duration-300 bg-white",
              "border border-gray-200 rounded-lg shadow-sm opacity-0",
            ]}
          >
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Margin ({cuex.config.margin}%)
              </h3>
            </div>
            <div class="py-4 flex justify-center items-center">
              <Slide
                title="Margin"
                min={0}
                max={40}
                value={cuex.config.margin}
                onInput$={(e: any) =>
                  cuex.update({ margin: Number(e.target?.value) })
                }
              />
            </div>
            <div data-popper-arrow></div>
          </div>
        </ToolbarButton>

        <ToolbarButton title="Speed">
          <LuZap
            data-popover-target="speed-panel"
            data-popover-trigger="click"
            class="outline-none"
          />
          <div
            q:slot="overlay"
            id="speed-panel"
            data-popover
            role="tooltip"
            class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0"
          >
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Speed ({cuex.config.speed})
              </h3>
            </div>
            <div class="py-4 flex justify-center items-center">
              <Slide
                title="Speed"
                min={1}
                max={50}
                value={cuex.config.speed}
                onInput$={(e: any) =>
                  cuex.update({ speed: Number(e.target?.value) })
                }
              />
            </div>
            <div data-popper-arrow></div>
          </div>
        </ToolbarButton>

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

        <ToolbarButton
          title="Play"
          aria-hidden={cuex.config.status === "running"}
          onClick$={() => cuex.startOrResume()}
          class="md:ml-8"
        >
          <LuPlay class="text-green-500 fill-green-500 hover:text-green-500 hover:fill-green-500" />
        </ToolbarButton>

        <ToolbarButton
          title="Pause"
          aria-hidden={cuex.config.status !== "running"}
          onClick$={() => cuex.pause()}
          class="md:ml-8"
        >
          <LuPause class="text-yellow-400 fill-yellow-400 hover:text-yellow-400 hover:fill-yellow-400" />
        </ToolbarButton>

        <ToolbarButton
          title="Stop"
          aria-hidden={cuex.config.status === "idle"}
          onClick$={() => {
            cuex.pause();
            cuex.update({ status: "idle" });
          }}
        >
          <LuSquare class="text-red-500 fill-red-500 hover:text-red-500 hover:fill-red-500" />
        </ToolbarButton>
      </div>
    </div>
  );
});
