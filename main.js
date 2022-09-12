let listaFinal = [];
let tarjetas = document.querySelectorAll(".tarjetas")
let tarjetasEnJuego = []
let colores = ["negro", "azul", "amarillo", "rojo", "verde", "violeta", "naranja", "gris", "negro", "azul", "amarillo", "rojo", "verde", "violeta", "naranja", "gris"];
let intentos = 0
let bienvenida = document.querySelector("#bienvenida")
let tablero = document.querySelector("#div-tablero")



function manejarRonda(e) {
    tarjeta = e.currentTarget
    const arrayTarjeta = [tarjeta]
    mostrar(tarjeta);
    bloquearInput(arrayTarjeta)
    tarjetasEnJuego.push(tarjeta);
    revisarConcidencias(tarjetasEnJuego);
    evaluarSiGano();
};

function revisarConcidencias($tarjetasEnJuego) {
    if ($tarjetasEnJuego.length >= 2) {
        if ($tarjetasEnJuego[0].querySelector("img").src === $tarjetasEnJuego[1].querySelector("img").src) {
            $tarjetasEnJuego[0].className = "exito"
            $tarjetasEnJuego[0].querySelector("img").src = "images/cards/exito.jpg"
            $tarjetasEnJuego[1].className = "exito"
            $tarjetasEnJuego[1].querySelector("img").src = "images/cards/exito.jpg"

        }
        bloquearInput(tarjetas);

        setTimeout(function() {
            ocultar(tarjetasEnJuego[0]);
            ocultar(tarjetasEnJuego[1]);
            desbloquearInput();
            tarjetasEnJuego = []
        }, 1000)
        intentos++
        document.querySelector("#contador").textContent = intentos

    };
}

function obtenerLista() {
    let numeroUnico
    while (listaFinal.length < 16) {
        numeroUnico = Math.floor(Math.random() * 16)
        if (comprobarSiEsUnico(numeroUnico)) {
            listaFinal.push(numeroUnico)
        }
    }
    return listaFinal
}

function comprobarSiEsUnico(n) {
    let esUnico = true
    listaFinal.forEach(function(i) {
        if (i === n) {
            esUnico = false
        }
    });
    return esUnico
}

function asignarTarjetas() {
    let j = 0
    listaFinal.forEach(function(n) {
        tarjetas[n].querySelector("img").src = "images/cards/boca-abajo.jpg"
        tarjetas[n].className = colores[j]
        j++
    });
}

function iniciarJuego() {
    document.getElementById("boton-iniciar").setAttribute("disabled", "")
    desbloquearInput();
    obtenerLista();
    asignarTarjetas();
    iniciarTimer()
    bienvenida.classList.add("oculto")
    tablero.classList.remove("oculto")

}

function iniciarTimer() {
    let n = 0;
    let horas = 0;
    let minutos = 0;
    let segundos = 0;
    t = setInterval(function() {

        document.getElementById("timer").textContent = `${horas} h : ${minutos} m : ${segundos} s`
        n++
        horas = Math.floor(n / 3600)
        minutos = Math.floor((n % 3600) / 60)
        segundos = ((n % 3600) % 60)
    }, 1000);
}

function pararTimer() {
    clearInterval(t)
}

function ocultar(elemento) {
    if (elemento.className !== "exito")
        elemento.querySelector("img").src = "images/cards/boca-abajo.jpg"
}

function mostrar(elemento) {
    const color = elemento.className
    elemento.querySelector("img").src = `images/cards/${color}.jpg`
}

function desbloquearInput() {
    tarjetas.forEach(function(imageElement) {
        if (imageElement.className !== "exito") {
            imageElement.onclick = manejarRonda
        } else {
            imageElement.onclick = function() {}
        }
    })
}

function bloquearInput($tarjetas) {
    $tarjetas.forEach(function(imageElement) {
        imageElement.onclick = function() {}
    });
}

function evaluarSiGano() {
    if (document.querySelectorAll(".exito").length === 16) {
        document.getElementById("ganador").className = ""
        document.getElementById("juego").className = "oculto"
        pararTimer()
        document.getElementById("texto-ganador").textContent = `GANASTE !!! en ${intentos} intentos`
    }

}

function reset() {
    document.getElementById("timer").textContent = "-"
    document.querySelector("#contador").textContent = "-"
    pararTimer()
    intentos = 0
    listaFinal = [];
    iniciarJuego()
}