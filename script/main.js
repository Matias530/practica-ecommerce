//////////////////////
// variables globales

let juegos = [
    {id:"1", titulo:"Counter-Strike 2", precio:20, img:"assets/juegos_img/cs_img.jpg"},
    {id:"2", titulo:"ELDEN RING NIGHTREIGN", precio:32, img:"assets/juegos_img/elden_ring_nightreign.jpg"},
    {id:"3", titulo:"Age of Empires II Definitive Edition", precio:20, img:"assets/juegos_img/aoe2.jpg"},
    {id:"4", titulo:"The Elder Scrolls IV: Oblivion Remastered", precio:35, img:"assets/juegos_img/oblivion.jpg"},
    {id:"5", titulo:"The Witcher 3: Wild Hunt", precio:30, img:"assets/juegos_img/witcher_3.jpg"},
    {id:"6", titulo:"DOOM Eternal", precio:24, img:"assets/juegos_img/doom_eternal.jpg"},
    {id:"7", titulo:"Half-Life 2", precio:6, img:"assets/juegos_img/hl2.jpg"},
    {id:"8", titulo:"Portal 2", precio:6, img:"assets/juegos_img/portal_2.jpg"},
    {id:"9", titulo:"Left 4 Dead 2", precio:6, img:"assets/juegos_img/l4d2.jpg"},
    {id:"10", titulo:"Resident Evil 4", precio:25, img:"assets/juegos_img/re4.jpg"},
    {id:"11", titulo:"God of War Ragnarök", precio:50, img:"assets/juegos_img/gowr.jpg"},
    {id:"12", titulo:"Marvel’s Spider-Man Remastered", precio:60, img:"assets/juegos_img/spiderman.jpg"},
    {id:"13", titulo:"Batman™: Arkham Knight", precio:10, img:"assets/juegos_img/batman.jpg"},
    {id:"14", titulo:"Grand Theft Auto V Enhanced", precio:30, img:"assets/juegos_img/gtav.jpg"},
    {id:"15", titulo:"Spyro™ Reignited Trilogy", precio:40, img:"assets/juegos_img/spyro.jpg"},
    {id:"16", titulo:"Hollow Knight: Silksong", precio:15, img:"assets/juegos_img/hks.jpg"},
];

let biblioteca = JSON.parse(sessionStorage.getItem("biblioteca"));
let carrito = JSON.parse(sessionStorage.getItem("carrito"));
let section_productos = document.getElementById("productos");
let barra_busqueda = document.getElementById("busqueda");


if(carrito === null){
    carrito = [];
}

if(biblioteca === null){
    biblioteca = [];
}


//////////////////////////////////
// agregar los juegos al catalogo

function mostrar_juegos(juegos){

    let elemento_html = "";

    for(let i=0; i < juegos.length; i++){
    
        elemento_html += `
                <div>
                    <div id="producto-${juegos[i].id}" class="producto">
                        <img src="${juegos[i].img}" alt="${juegos[i].titulo}">
                        <p><span class="tag">$${juegos[i].precio} USD</span> ${juegos[i].titulo}</p>
                        <button id="boton-${juegos[i].id}" class="boton">Añadir al carrito</button>
                    </div>
                </div>`;
    }

    section_productos.innerHTML = elemento_html;
}


/////////////////////////////////////////////////////////////////////////
// agrega evento click a los botones de los juegos para añadir al carrito

function agregar_evento_botones(juegos){

    for(let i=0; i<juegos.length; i++){
    
        let boton = document.getElementById(`boton-${juegos[i].id}`);
        
        boton.addEventListener("click", function(){
            
            if(!carrito.some((juego) => juego.id === juegos[i].id) && !biblioteca.some((juego) => juego.id === juegos[i].id)){
    
                let boton_actual = document.getElementById(`boton-${juegos[i].id}`);
                boton_actual.textContent = "En el carrito";
    
    
                carrito.push(juegos[i]);
    
                sessionStorage.setItem("carrito", JSON.stringify(carrito));
            }
        });
    }
}



function cambiar_texto_botones(){

    for(let i=0; i<carrito.length; i++){

        let boton = document.getElementById(`boton-${carrito[i].id}`);
        if(boton != null){
            boton.textContent = "En el carrito";
        }
    }

    for(let i=0; i<biblioteca.length; i++){
        
        let boton = document.getElementById(`boton-${biblioteca[i].id}`);
        if(boton != null){
            boton.textContent = "En la biblioteca";
        }
    }
}

//////////
// inicio

function init(juegos){
    mostrar_juegos(juegos);
    agregar_evento_botones(juegos);
}

init(juegos);


///////////
// eventos

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// añade evento al terminar de cargar la pagina para mostrar que juegos ya estan en el carrito o biblioteca

addEventListener("load", function(){

    cambiar_texto_botones();
});


////////////////////
// barra de busqueda

barra_busqueda.addEventListener("keydown", function(){

    let juegos_encontrados = juegos.filter(juego => juego.titulo.toLowerCase().includes(barra_busqueda.value.toLowerCase()));

    if(juegos_encontrados.length > 0){
        mostrar_juegos(juegos_encontrados);
        agregar_evento_botones(juegos_encontrados);
    }else{
        mostrar_juegos(juegos);
        agregar_evento_botones(juegos);
    }
})


barra_busqueda.addEventListener("keyup", function(){

    cambiar_texto_botones();
});


barra_busqueda.addEventListener("input", function(){

    cambiar_texto_botones();
});