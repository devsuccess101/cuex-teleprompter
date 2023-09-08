import { type PropFunction, component$ } from "@builder.io/qwik";

interface SlideProps {
  value?: number;
  min?: number;
  max?: number;
  title?: string;
  onInput$?: PropFunction<(event: InputEvent) => void>;
}

export const Slide = component$<SlideProps>((props) => {
  return (
    <input
      type="range"
      class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer mx-2"
      {...props}
    />
  );
});
