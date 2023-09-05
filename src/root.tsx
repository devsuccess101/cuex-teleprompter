import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { QwikPartytown } from "./components/partytown/partytown";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
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
