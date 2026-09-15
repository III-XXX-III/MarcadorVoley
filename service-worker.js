const CACHE_NAME = "voley-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS))
    );

});


self.addEventListener("activate", event => {

    event.waitUntil(
        self.clients.claim()
    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => {

                return respuesta || fetch(event.request);

            })

    );

});