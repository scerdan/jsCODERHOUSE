'use strict';

//Menu animado
let menu = document.querySelectorAll('#menu')[0];
let fondo = document.querySelectorAll('nav')[0];
menu.addEventListener('click', function (e) {
    e.preventDefault();
    fondo.style.visibility = 'visible';
});
window.addEventListener('click', function (e) {
    if (e.target == fondo) {
        cerrarModal();
    }
});

function cerrarModal() {
    fondo.style.visibility = 'hidden';
}
//Se registra los usuarios in sessionStorage
function enviar() {
    let correoUsuario = document.getElementById("mail").value;
    let passUsuario = document.getElementById("pass").value;
    if (correoUsuario == '' || passUsuario == '') {
        alert("Debe ingresar un correo o pass validos");
    } else {
        sessionStorage.setItem('Mail', correoUsuario);
        sessionStorage.setItem('Password', passUsuario);
        $("#suc").animate({
            left: "40%",
        }, 500, );
        $("#suc").animate({
            opacity: '0',
        }, 1500, );
    }
};
//Se loguea los usuarios in sessionStorage
function acceso() {
    let mailV = document.getElementById('mail').value;
    let passV = document.getElementById('pass').value;
    if (mailV == sessionStorage.getItem('Mail') && passV == sessionStorage.getItem('Password')) {
        console.log('Estas adentro');
        traerdatosUser();
        traerdatos();
        $("header").children("img").remove();
        $("<div class='tapete'></div>").appendTo("body");
        cerrarModal();
        crearCartas();
        $("#cortina").animate({
            top: "-100vh"
        }, 1250);
    } else {
        alert('Debe estar registrado para poder Ingresar:');
    }
};

function crearCartas() {
    $('<h2>Elige tu primer carta!</h2>').appendTo("body");
    $("<img class='carta' src='' id='imgA' onclick='carta(this)'>").appendTo($(".tapete"));
    $("<img class='carta' src='' id='imgB' onclick='carta(this)'>").appendTo($(".tapete"));
    $("<img class='carta' src='' id='imgC' onclick='carta(this)'>").appendTo($(".tapete"));
    $("<img class='carta' src='' id='imgD' onclick='carta(this)'>").appendTo($(".tapete"));
};

function carta(p) {
    let ccc = p.id;
    if (ccc === 'imgA') {
        // console.log(cartasUser[0]);
        $('#imgA').addClass('elegir');
        $('#imgB, #imgC, #imgD').addClass('ocultar');
        optionCard(0);
        $('#imgA').prop("onclick", null);
    } else if (ccc === 'imgB') {
        $('#imgB').addClass('elegir');
        $('#imgA, #imgC, #imgD').addClass('ocultar');
        $('#imgB').prop("onclick", null);
        optionCard(1);
    } else if (ccc === 'imgC') {
        $('#imgC').addClass('elegir');
        $('#imgA, #imgB, #imgD').addClass('ocultar');
        $('#imgC').prop("onclick", null);
        optionCard(2);
    } else if (ccc === 'imgD') {
        $('#imgD').addClass('elegir');
        $('#imgB, #imgC, #imgA').addClass('ocultar');
        $('#imgD').prop("onclick", null);
        optionCard(3);
    };
    $("body").children("h2").remove();
};

function optionCard(p) {
    $('<div id="contenedor"></div>').appendTo($(".tapete"));
    $('<h4 onclick="atkOrDef(this)">Continuar a la carta de su oponente...</h4>').appendTo($("#contenedor"));
    $('<p id="desc"></p>').appendTo($("#contenedor"));
    $('<h3></h3>').appendTo($("#contenedor"));
    $("p").html(cartasUser[p].desc);
    $("h3").html(cartasUser[p].name);
        cartasElegidas.push(cartasUser[p], cartasNpc[0]);

}

//CREAR FUNCION QUE SELECCIONE NPC CARD Y LA MUESTRE
// Datos de cartas seleccionadas
let cartasUser = [];
let cartasNpc = [];
let cartasElegidas = [];
//FUNCION btn User
function traerdatosUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let cardE = JSON.parse(this.responseText);
            let primerCarta = NumerosAleatorios(1, 420);
            let segundaCarta = NumerosAleatorios(1, 420);
            let terceraCarta = NumerosAleatorios(1, 420);
            let cuartaCarta = NumerosAleatorios(1, 420);
            //Atributo del ID del elemento
            imgA.setAttribute('src', cardE.data[primerCarta].card_images[0].image_url);
            imgB.setAttribute('src', cardE.data[segundaCarta].card_images[0].image_url);
            imgC.setAttribute('src', cardE.data[terceraCarta].card_images[0].image_url);
            imgD.setAttribute('src', cardE.data[cuartaCarta].card_images[0].image_url);
            cartasUser.push(cardE.data[primerCarta])[0];
            cartasUser.push(cardE.data[segundaCarta])[1];
            cartasUser.push(cardE.data[terceraCarta])[2];
            cartasUser.push(cardE.data[cuartaCarta])[3];
        }
    }
};

//FUNCION btn Npc
function traerdatos() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=XYZ%20Monster', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let cardE = JSON.parse(this.responseText);
            let primerCarta = NumerosAleatorios(1, 420);
            cartasNpc.push(cardE.data[primerCarta])[0];
        }
    };
};

function NumerosAleatorios(min, max) {
    return Math.round(Math.random() * (max - min) + +Math.random(420));
}
console.log(cartasNpc);
console.log(cartasUser);

function atkOrDef(p) {
    $("#contenedor").empty();
    $("<img class='carta elegir' src='' id='imgNpc'>").appendTo($(".tapete"));
    imgNpc.setAttribute('src', cartasNpc[0].card_images[0].image_url);
    $('<p id="ver" class="selectVer">Atk --></p>').appendTo("body");
    $('<p id="verDef" class="selectVer"><-- Def</p>').appendTo("body");
    let btnAtacar = document.getElementById('ver');
    let btnDefender = document.getElementById('verDef');
    btnAtacar.addEventListener('click', function() {
        userActionAtk();
    });
    btnDefender.addEventListener('click', function() {
        userActionDef();
    });
}

function userActionAtk() {
    const atkUser = cartasElegidas[0].atk;
    const atkNPC = cartasElegidas[1].atk;
    if (atkUser === atkNPC) {
        console.log('EMPATE!');
    } else if (atkUser > atkNPC) {
        console.log(' HA GANADO!');
        $('<div id="banner"></div>').appendTo("body");
        $('<p>HA GANADO!!!</p>').appendTo($("#banner"));
    } else if (atkUser < atkNPC) {
        console.log(' HA PERDIDO!');
    }
};
function userActionDef() {
    const defUser = cartasElegidas[0].def;
    const defNPC = cartasElegidas[1].def;
    if (defUser === defNPC) {
        console.log('EMPATE!');
    } else if (defUser > defNPC) {
        console.log(' HA GANADO!');
        $('<div id="banner"></div>').appendTo("body");
        $('<p>HA GANADO!!!</p>').appendTo($("#banner"));
    } else if (defUser < defNPC) {
        console.log(' HA PERDIDO!');
    } else if (defUser === ) {
}

function logout() {
    document.getElementById('cortina').style.cssText = "transition: all 2s ease;transform: translateY(0vh);";
    console.log('Vuelva Pronto!');
    sessionStorage.clear();
    location.reload();
};