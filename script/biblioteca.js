//////////////////////
// variables globales

let biblioteca = JSON.parse(sessionStorage.getItem("biblioteca"));

let section_biblioteca = document.getElementById("biblioteca-section");


///////////////////////////////////////////////
// agrega los juegos adquiridos a la biblioteca

function mostrar_biblioteca(biblioteca){

    let elemento_html = "";

    for(let i=0; i < biblioteca.length; i++){

    elemento_html += `
            <div>
                <div id="producto-${biblioteca[i].id}" class="producto">
                    <img src="../${biblioteca[i].img}" alt="${biblioteca[i].titulo}">
                    <p>${biblioteca[i].titulo}</p>
                    <button id="boton-${biblioteca[i].id}" class="boton">Jugar</button>
                </div>
            </div>`;
    }

    section_biblioteca.innerHTML = elemento_html;
}


////////////////////////////////////////////////////////////
// agrega evento click al boton jugar para iniciar el juego

function agregar_evento_jugar(biblioteca){
    for(juego of biblioteca){

        let boton = document.getElementById(`boton-${juego.id}`);

        let alert_txt = `Se esta iniciando ${juego.titulo}...`;

        boton.addEventListener("click", () => alert(alert_txt));
    }
}


//////////
// inicio

function init(biblioteca){

    mostrar_biblioteca(biblioteca);
    agregar_evento_jugar(biblioteca);
}


if(biblioteca != null){

    init(biblioteca);
}