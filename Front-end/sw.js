const CACHE_NAME = "login-cache-v1";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Cache ouvert");
        })
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    // Intercepte seulement la requête login
    if (request.url.includes("/api/login") && request.method === "POST") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone la réponse pour l'utiliser et la stocker
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, clonedResponse);
                    });
                    return response;
                })
                .catch(() => {
                    // En cas d'erreur réseau, retourne la réponse en cache
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || new Response(
                            JSON.stringify({ error: "Mode hors ligne. Aucune réponse en cache." }),
                            { status: 503, headers: { "Content-Type": "application/json" } }
                        );
                    });
                })
        );
    }
});
