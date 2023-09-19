import { component$, useVisibleTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { QwikPartytown } from "./components/partytown/partytown";
import { initFlowbite } from "flowbite";

import "./global.css";

export default component$(() => {
  useVisibleTask$(() => {
    initFlowbite();
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
        <QwikPartytown forward={["dataLayer.push"]} />
        {import.meta.env.PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              type="text/partytown"
              src={`https://www.googletagmanager.com/gtag/js?id=${
                import.meta.env.PUBLIC_GA_MEASUREMENT_ID
              }`}
            />
            <script
              type="text/partytown"
              dangerouslySetInnerHTML={`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${import.meta.env.PUBLIC_GA_MEASUREMENT_ID}');`}
            />
          </>
        )}
      </body>
    </QwikCityProvider>
  );
});
