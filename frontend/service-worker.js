const CACHE_NAME = "github-user-info-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./index.js",
  "./view-templates.js",
  "./styles/main.css",
  "./styles/base.css",
  "./styles/layout.css",
  "./styles/components.css",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // GitHub APIやCDNなどの外部通信には介入しない
  if (
    event.request.method !== "GET" ||
    requestUrl.origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse ?? fetch(event.request);
    }),
  );
});
