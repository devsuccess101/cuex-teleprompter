import {
  component$,
  useVisibleTask$,
  $,
  useStore,
  type NoSerialize,
  noSerialize,
} from "@builder.io/qwik";

interface InstallPromptStore {
  hidden: boolean;
  deferredPrompt?: NoSerialize<Event>;
}

export const InstallPrompt = component$(() => {
  const promptStore = useStore<InstallPromptStore>({ hidden: true });

  const notNow = $(() => {
    promptStore.hidden = true;
  });

  const install = $(() => {
    promptStore.hidden = true;
    // @ts-ignore
    promptStore.deferredPrompt?.prompt();
    // @ts-ignore
    promptStore.deferredPrompt?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      promptStore.deferredPrompt = undefined;
    });
  });

  useVisibleTask$(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      promptStore.deferredPrompt = noSerialize(event);
    });
  });

  return promptStore.hidden ? null : (
    <div class="px-8 py-4 bg-purple-700 text-white text-center lg:flex flex-row justify-between items-center">
      <div class="text-lg">Use CueX teleprompter anytime, even offline.</div>
      <div class="flex justify-center mt-4 lg:mt-0">
        <button
          type="button"
          class="px-8 py-2 rounded-full text-purple-300"
          onClick$={notNow}
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
