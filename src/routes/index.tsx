import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="p-8">
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Free Teleprompter - CueX",
  meta: [
    {
      name: "description",
      content:
        "CueX is a free online teleprompter that runs on smartphones, tablets and desktops, making it your ideal companion for smooth and professional script delivery.",
    },
  ],
};
