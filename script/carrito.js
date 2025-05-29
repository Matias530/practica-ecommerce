//////////////////////
// variables globales

let carrito = JSON.parse(sessionStorage.getItem("carrito"));
let biblioteca = JSON.parse(sessionStorage.getItem("biblioteca"));

let precio_total = 0;

let carrito_section = document.getElementById("carrito");

if(biblioteca === null){
    biblioteca = [];
}


/////////////////////////////////////////////
// agrega los juegos seleccionados al carrito

function mostrar_carrito(carrito){

    let elemento_html = "";

    for(let i=0; i<carrito.length; i++){

        elemento_html += `
                <div id="producto-${carrito[i].id}" class="producto-carrito">
                    <img src="../${carrito[i].img}" alt="${carrito[i].titulo}">
                    <p>${carrito[i].titulo} <span class="tag">$${carrito[i].precio} USD</span></p>
                    <div><button id="boton-${carrito[i].id}" class="boton">Eliminar del carrito</button></div>
                </div>`;
    
        precio_total += carrito[i].precio;
    }
    
    
    elemento_html += `<h2 class="titulo" id="precio-final">Precio Final: $${precio_total} USD</h2>
                        <button id="boton-comprar" class="boton">Comprar</button>`

    carrito_section.innerHTML = elemento_html;

}


///////////////////////////////////////////////////////////////////
// agrega evento click al boton para eliminar un juego del carrito

function agregar_eventos_botones(carrito){

    for(let i=0; i<carrito.length; i++){

        let boton = document.getElementById(`boton-${carrito[i].id}`);
        let producto_actual = carrito[i];

        boton.addEventListener("click", function(){

            let producto = producto_actual;

            let elemento = document.getElementById(`producto-${producto.id}`);

            precio_total -= producto.precio;
            let indice = carrito.findIndex(j => j.id === producto.id);

            carrito.splice(indice, 1);

            carrito_section.removeChild(elemento);

            if(carrito.length > 0){

                let carrito_str = JSON.stringify(carrito);
                sessionStorage.setItem("carrito", carrito_str);

                let elemento_precio_final = document.getElementById("precio-final");

                elemento_precio_final.textContent = `Precio Final: $${precio_total} USD`;

            }else{

                sessionStorage.removeItem("carrito");

                carrito_section.innerHTML = `
                <div>
                    <h2 class="titulo">El carrito esta vacio</h2>
                </div>`;
            }  
        });
    }
}


//////////////////////////////////////////////////////////////////////////
// evento click al boton de comprar que agrega los juegos a la biblioteca

function evento_comprar(){

    let boton_comprar = document.getElementById("boton-comprar");
        
    boton_comprar.addEventListener("click", function(){
    
        carrito_section.replaceChildren();
        carrito_section.innerHTML = `
                <div>
                    <h2 class="titulo">Gracias por su compra.</h2>
                </div>`;
            
        sessionStorage.removeItem("carrito");
    
        for(let i=0; i<carrito.length; i++){
            biblioteca.push(carrito[i]);
        }
    
        sessionStorage.setItem("biblioteca", JSON.stringify(biblioteca));
    })
}


//////////
// inicio

function init(carrito){
    mostrar_carrito(carrito);
    agregar_eventos_botones(carrito);
    evento_comprar();
}


if(carrito != null){

    init(carrito);
}