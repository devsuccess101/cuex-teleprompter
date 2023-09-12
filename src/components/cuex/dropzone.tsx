import { type PropFunction, component$ } from "@builder.io/qwik";
import { LuFileText } from "@qwikest/icons/lucide";

interface DropzoneProps {
  onChange$: PropFunction<(e: any) => void>;
}

export const Dropzone = component$<DropzoneProps>(({ onChange$ }) => {
  return (
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <LuFileText class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to choose</span> your file
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">DOC or DOCX</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          <i>This file is for browser use only. We don't store anything!</i>
        </p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        class="hidden"
        accept=".doc, .docx"
        onChange$={onChange$}
      />
    </label>
  );
});
