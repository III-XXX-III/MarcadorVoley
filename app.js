/* ========================================
   ESTADO
   ======================================== */

let puntosA =
    Number(localStorage.getItem("puntosA")) || 0;

let puntosB =
    Number(localStorage.getItem("puntosB")) || 0;

let setsA =
    Number(localStorage.getItem("setsA")) || 0;

let setsB =
    Number(localStorage.getItem("setsB")) || 0;


let nombreA =
    localStorage.getItem("nombreA") ||
    "EQUIPO A";

let nombreB =
    localStorage.getItem("nombreB") ||
    "EQUIPO B";


let colorA =
    localStorage.getItem("colorA") ||
    "#ffffff";

let colorB =
    localStorage.getItem("colorB") ||
    "#ffffff";


let equipoColorActivo = null;


/* ========================================
   PALETA
   ======================================== */

const COLORES = [
    "#ffffff",
    "#ff453a",
    "#ff9f0a",
    "#ffd60a",
    "#30d158",
    "#64d2ff",
    "#0a84ff",
    "#bf5af2",
    "#ff375f",
    "#ac8e68",
    "#8e8e93",
    "#5e5ce6"
];


/* ========================================
   ACTUALIZAR INTERFAZ
   ======================================== */

function actualizar() {

    document.getElementById("puntosA").textContent =
        puntosA;

    document.getElementById("puntosB").textContent =
        puntosB;


    document.getElementById("setsA").textContent =
        setsA;

    document.getElementById("setsB").textContent =
        setsB;


    document.getElementById("nombreA").textContent =
        nombreA;

    document.getElementById("nombreB").textContent =
        nombreB;


    aplicarColor("A");
    aplicarColor("B");


    guardar();
}


/* ========================================
   GUARDAR
   ======================================== */

function guardar() {

    localStorage.setItem(
        "puntosA",
        puntosA
    );

    localStorage.setItem(
        "puntosB",
        puntosB
    );

    localStorage.setItem(
        "setsA",
        setsA
    );

    localStorage.setItem(
        "setsB",
        setsB
    );

    localStorage.setItem(
        "nombreA",
        nombreA
    );

    localStorage.setItem(
        "nombreB",
        nombreB
    );

    localStorage.setItem(
        "colorA",
        colorA
    );

    localStorage.setItem(
        "colorB",
        colorB
    );
}


/* ========================================
   PUNTOS
   ======================================== */

function sumar(equipo) {

    if (equipo === "A") {
        puntosA++;
    } else {
        puntosB++;
    }

    actualizar();
}


function restar(equipo) {

    if (equipo === "A") {

        if (puntosA > 0) {
            puntosA--;
        }

    } else {

        if (puntosB > 0) {
            puntosB--;
        }
    }

    actualizar();
}


/* ========================================
   SETS
   ======================================== */

function sumarSet(equipo) {

    if (equipo === "A") {
        setsA++;
    } else {
        setsB++;
    }

    actualizar();
}


function restarSet(equipo) {

    if (equipo === "A") {

        if (setsA > 0) {
            setsA--;
        }

    } else {

        if (setsB > 0) {
            setsB--;
        }
    }

    actualizar();
}


/* ========================================
   NOMBRE DEL EQUIPO
   ======================================== */

function cambiarNombre(equipo) {

    const actual =
        equipo === "A"
            ? nombreA
            : nombreB;


    const nuevo = prompt(
        "Nombre del equipo:",
        actual
    );


    if (nuevo === null) {
        return;
    }


    const limpio =
        nuevo.trim();


    if (!limpio) {
        return;
    }


    if (equipo === "A") {
        nombreA = limpio;
    } else {
        nombreB = limpio;
    }


    actualizar();
}


/* ========================================
   COLOR
   ======================================== */

function cambiarColor(equipo) {

    equipoColorActivo =
        equipo;


    crearPaleta();


    document
        .getElementById("modalColor")
        .classList
        .remove("oculto");
}


function crearPaleta() {

    const paleta =
        document.getElementById("paleta");


    paleta.innerHTML = "";


    COLORES.forEach(color => {

        const boton =
            document.createElement("button");


        boton.className =
            "color-opcion";


        boton.style.background =
            color;


        boton.setAttribute(
            "aria-label",
            "Seleccionar color"
        );


        boton.onclick = () => {

            seleccionarColor(
                color
            );

        };


        paleta.appendChild(
            boton
        );

    });
}


function seleccionarColor(color) {

    if (equipoColorActivo === "A") {
        colorA = color;
    }

    if (equipoColorActivo === "B") {
        colorB = color;
    }


    actualizar();

    cerrarColores();
}


function aplicarColor(equipo) {

    const color =
        equipo === "A"
            ? colorA
            : colorB;


    document
        .getElementById(
            "nombre" + equipo
        )
        .style.color =
        color;


    document
        .getElementById(
            "puntos" + equipo
        )
        .style.color =
        color;


    document
        .getElementById(
            "numero-set"
        );


    document
        .getElementById(
            "color" + equipo
        )
        .style.background =
        color;


    document
        .getElementById(
            "sets" + equipo
        )
        .style.color =
        color;
}


function cerrarColores() {

    document
        .getElementById("modalColor")
        .classList
        .add("oculto");


    equipoColorActivo =
        null;
}


/* ========================================
   REINICIAR
   ======================================== */

function reiniciarPuntos() {

    const confirmar =
        confirm(
            "¿Reiniciar los puntos?"
        );


    if (!confirmar) {
        return;
    }


    puntosA = 0;
    puntosB = 0;


    actualizar();
}


/* ========================================
   NUEVO PARTIDO
   ======================================== */

function nuevoPartido() {

    const confirmar =
        confirm(
            "¿Iniciar un nuevo partido? Se reiniciarán puntos y sets."
        );


    if (!confirmar) {
        return;
    }


    puntosA = 0;
    puntosB = 0;

    setsA = 0;
    setsB = 0;


    actualizar();
}


/* ========================================
   CERRAR MODAL TOCANDO EL FONDO
   ======================================== */

document
    .getElementById("modalColor")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "modalColor"
            ) {
                cerrarColores();
            }

        }
    );


/* ========================================
   INICIAR
   ======================================== */

actualizar();


/* ========================================
   SERVICE WORKER
   ======================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator
                .serviceWorker
                .register(
                    "./service-worker.js"
                );

        }
    );
}
