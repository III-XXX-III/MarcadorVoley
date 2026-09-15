let puntosA = parseInt(localStorage.getItem("puntosA")) || 0;
let puntosB = parseInt(localStorage.getItem("puntosB")) || 0;


function actualizar() {

    document.getElementById("puntosA").textContent = puntosA;
    document.getElementById("puntosB").textContent = puntosB;

    localStorage.setItem("puntosA", puntosA);
    localStorage.setItem("puntosB", puntosB);
}


function vibrar() {

    if ("vibrate" in navigator) {
        navigator.vibrate(20);
    }
}


function sumar(equipo) {

    if (equipo === "A") {
        puntosA++;
    } else {
        puntosB++;
    }

    vibrar();
    actualizar();
}


function restar(equipo) {

    if (equipo === "A" && puntosA > 0) {
        puntosA--;
    }

    if (equipo === "B" && puntosB > 0) {
        puntosB--;
    }

    vibrar();
    actualizar();
}


function reiniciar() {

    if (confirm("¿Reiniciar el marcador?")) {

        puntosA = 0;
        puntosB = 0;

        actualizar();
    }
}

function cambiarNombre(equipo) {

    let nombreActual;

    if (equipo === "A") {
        nombreActual = document.getElementById("nombreA").textContent;
    } else {
        nombreActual = document.getElementById("nombreB").textContent;
    }

    const nuevoNombre = prompt(
        "Nombre del equipo:",
        nombreActual
    );

    if (nuevoNombre === null) {
        return;
    }

    const nombreLimpio = nuevoNombre.trim();

    if (nombreLimpio === "") {
        return;
    }

    if (equipo === "A") {

        document.getElementById("nombreA").textContent = nombreLimpio;
        localStorage.setItem("nombreA", nombreLimpio);

    } else {

        document.getElementById("nombreB").textContent = nombreLimpio;
        localStorage.setItem("nombreB", nombreLimpio);

    }
}

const nombreGuardadoA = localStorage.getItem("nombreA");
const nombreGuardadoB = localStorage.getItem("nombreB");

if (nombreGuardadoA) {
    document.getElementById("nombreA").textContent = nombreGuardadoA;
}

if (nombreGuardadoB) {
    document.getElementById("nombreB").textContent = nombreGuardadoB;
}

actualizar();


/* SERVICE WORKER */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("service-worker.js")
            .catch(error => {
                console.log("Service Worker:", error);
            });

    });
}