import type { NoSerialize } from "@builder.io/qwik";
import {
  $,
  component$,
  useStore,
  noSerialize,
  useOnWindow,
} from "@builder.io/qwik";

interface PromptStore {
  hidden: boolean;
  deferredPrompt?: NoSerialize<Event>;
}

export const InstallPrompt = component$(() => {
  const promptStore = useStore<PromptStore>({ hidden: true });

  // On click the not now button:
  const cancel = $(() => {
    promptStore.hidden = true;
    promptStore.deferredPrompt = undefined;
    sessionStorage.setItem("pwa_canceled", "true");
  });

  // On click the install button:
  const install = $(async () => {
    promptStore.hidden = true;
    // @ts-ignore
    const result = await promptStore.deferredPrompt?.prompt();
    if (result?.outcome === "dismissed") {
      sessionStorage.setItem("pwa_canceled", "true");
    }
    promptStore.deferredPrompt = undefined;
  });

  useOnWindow(
    "beforeinstallprompt",
    $((event) => {
      // Don't let the default prompt go.
      event.preventDefault();

      const canceled = Boolean(sessionStorage.getItem("pwa_canceled"));

      if (!canceled) {
        // Store prompt event
        promptStore.deferredPrompt = noSerialize(event);

        // Display custom UI
        promptStore.hidden = false;
      }
    }),
  );

  return (
    <div
      class={[
        promptStore.hidden ? "hidden" : "lg:flex",
        "px-4 py-4 bg-purple-700 text-white text-center w-full",
        "fixed left-0 bottom-0 flex-row justify-between items-center",
      ]}
    >
      <div class="text-md font-bold">
        Use CueX teleprompter anytime, even offline.
      </div>
      <div class="flex justify-center mt-4 lg:mt-0">
        <button
          type="button"
          class="px-8 py-2 rounded-full text-purple-300"
          onClick$={cancel}
        >
          Not now
        </button>
        <button
          type="button"
          class="px-8 py-2 rounded-full bg-white text-purple-800"
          onClick$={install}
        >
          Install
        </button>
      </div>
    </div>
  );
});
