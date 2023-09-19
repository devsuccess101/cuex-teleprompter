import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="google-site-verification"
        content="yu60NP-CTckMJK8rCQBg1xrNZ75rcqoxlg0Pz3-spfo"
      />
      <link rel="apple-touch-icon" href="/icon/icon-192x192.png" />
      {[192, 256, 384, 512].map((size) => (
        <link
          key={size}
          rel="icon"
          type="image/png"
          href={`/icon/icon-${size}x${size}.png`}
          sizes={`${size}x${size}`}
        />
      ))}

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
