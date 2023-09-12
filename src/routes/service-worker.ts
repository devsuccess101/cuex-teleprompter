/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

const revision = import.meta.env.VITE_GIT_COMMIT_HASH;

precacheAndRoute([
  { url: "/", revision },
  { url: "/?pwa=true", revision },
  { url: "/manifest.webmanifest", revision },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js",
    revision: "1.6.0",
  },
  {
    url: "/icon/icon-192x192.png",
    revision,
  },
  {
    url: "/icon/icon-256x256.png",
    revision,
  },
  {
    url: "/icon/icon-384x384.png",
    revision,
  },
  {
    url: "/icon/icon-512x512.png",
    revision,
  },
]);
cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL("/")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/?pwa=true")));
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "image",
  new CacheFirst(),
);

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

declare const self: ServiceWorkerGlobalScope;
