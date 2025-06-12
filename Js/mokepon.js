const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

sectionReiniciar.style.display = 'none'
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const eligirMascotaJugador = document.getElementsByClassName('mascotas')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = [] 
let ataqueEnemigo = []
let opcionDeMokepones
let jugadorId = null
let enemigoId = null
let inputHipodoge 
let inputCapipepo  
let inputRatigueya  
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let botonFuego 
let botonAgua 
let botonTierra
let botones = []
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaBuscamos
let anchoMapa = window.innerWidth - 20
const anchoMaxMap = 350

if (anchoMapa > anchoMaxMap){
    anchoMapa =  anchoMaxMap - 20
}
alturaBuscamos = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaBuscamos
class Mokepon{
    constructor (nombre, foto, vida, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width- this.ancho)
        this.y = aleatorio(0, mapa.height- this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
    lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )}
}

let hipodoge = new Mokepon('Hipodoge','./assets/hipodoge.png',5)
let capipepo = new Mokepon('Capipepo','./assets/capipepo.png',5)
let ratigueya = new Mokepon('Ratigueya','./assets/ratigueya.png',5)
const HIPODOGUE_ATAQUES = [    
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🌱',id:'boton-tierra'},]
hipodoge.ataques.push(...HIPODOGUE_ATAQUES)
const CAPIPEPO_ATAQUES =[    
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'🌱',id:'boton-tierra'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🔥',id:'boton-fuego'},]
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
const RATIGUEYA_ATAQUES = [
 {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'🔥',id:'boton-fuego'},
    {nombre:'💧',id:'boton-agua'},
    {nombre:'🌱',id:'boton-tierra'},
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" class= "mascotas" id=${mokepon.nombre} />
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}/>
        </label>
        
        `
        
        contenedorTarjetas.innerHTML  += opcionDeMokepones
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
     })


    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

    inputHipodoge.addEventListener('click', activarBoton)
    inputCapipepo.addEventListener('click', activarBoton)
    inputRatigueya.addEventListener('click', activarBoton)
    unirseAlJuego()
}
function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    
  
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } 
    seleccionarMokepon(mascotaJugador)
    activarBoton()
    extraerAtaques(mascotaJugador)
    
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()

    
}
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}
function activarBoton(){
    botonMascotaJugador.removeAttribute('disabled');  
}
function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
       ataquesMokepon = `
       <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
       `
       contenedorAtaques.innerHTML += ataquesMokepon
    }) 
        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BAtaque')
        
}
function secuenciaAtaque(){

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥' ){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = 'white'
                boton.disabled = true
            }
            else if(e.target.textContent === '💧' ){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = 'white'
                boton.disabled = true
            }
            else {
            ataqueJugador.push('TIERRA')
            console.log(ataqueJugador)
            boton.style.background = 'white'
            boton.disabled = true
            }
            if (ataqueJugador.length === 5)
            enviarAtaques()
        })
    })
}
function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           ataques: ataqueJugador 
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)

}
function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5)
        combate()
}
function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate() {
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!😅")
    } else if (vidasJugador > victoriasEnemigo) {
        crearMensajeFinal('Felicitaciones! ganaste 🎉')
    } else if (vidasJugador < victoriasEnemigo) {
    crearMensajeFinal('Lo siento, perdiste 😒')
}
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height

    )
    mascotaJugadorObjeto.pintarMokepon()
   enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function (mokepon)
    {
        if(mokepon != undefined){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
        }
    })
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })

    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                         if(enemigo.mokepon != undefined){
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge','./assets/hipodoge.png',5, enemigo.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo','./assets/capipepo.png',5, enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya','./assets/ratigueya.png',5, enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                    }
                    return mokeponEnemigo
                })
            })
        }
    })
}
function moverDer(){
    mascotaJugadorObjeto.velocidadX = 5
    
}
function moverIzq(){
    mascotaJugadorObjeto.velocidadX = -5
    
}
function moverArr(){
    mascotaJugadorObjeto.velocidadY = -5
   
}
function moverAba(){
    mascotaJugadorObjeto.velocidadY = 5
}
function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArr()
            break
        case'ArrowDown':
            moverAba()
            break
        case 'ArrowLeft':
            moverIzq()
            break
        case 'ArrowRight':
            moverDer()
            break
        default:
            break;
    }

}
function iniciarMapa(){
    // mapa.width = 600
    // mapa.height = 540
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjetoMascota(){
    for(let i = 0; i < mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}
function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajomascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x
    if (
        abajomascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo    ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display ="none"
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)