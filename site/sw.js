// Replaces the old app's service worker: removes the old app's saved copy and unregisters itself,
// so devices that installed the old app load this page instead of the cached app.
// Only "pairloom-" caches are removed; the new app's caches on the same origin must survive.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith("pairloom-")) await caches.delete(key);
    }
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: "window" })) client.navigate(client.url);
  })());
});
