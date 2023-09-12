import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { LuFileWarning, LuX } from "@qwikest/icons/lucide";
import { get } from "lodash";
import { CuexContext } from "./context";
import { Dropzone } from "./dropzone";
import { Modal } from "flowbite";

export const ImportModal = component$(() => {
  const modalRef = useSignal<HTMLElement>();
  const cuex = useContext(CuexContext);
  const err = useSignal<Error>();

  const handleFileChange = $((e: any) => {
    const file: File = get(e.target, "files[0]");
    const reader = new FileReader();

    reader.onload = function (loadEvent: any) {
      const arrayBuffer = loadEvent.target.result;
      // @ts-ignore
      window.mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(({ value }: any) => {
          cuex.setEditorContent(value);
          new Modal(modalRef.value).hide();
        })
        .catch((e: Error) => (err.value = e));
    };

    reader.readAsArrayBuffer(file);
  });

  return (
    <div
      ref={modalRef}
      id="import-modal"
      tabIndex={-1}
      class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="import-modal"
          >
            <LuX class="w-3 h-3" />
            <span class="sr-only">Close modal</span>
          </button>
          <div class="flex items-center justify-center w-full">
            {!err.value && <Dropzone onChange$={handleFileChange} />}
            {err.value && (
              <div class="p-6">
                <LuFileWarning class="w-8 h-8 mb-4 text-yellow-500" />
                <p class="text-red-600">
                  Sorry, something went wrong. We could not read content in your
                  file.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"
        integrity="sha512-sG5Q7boJL+ft/weuz6Mmi9XBD+bEzE9AI2FMP4YMFxp3FpTFUQSQQm5K5cSgJCyed6bWs3W8f8h0lp36lHXhQA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </div>
  );
});
