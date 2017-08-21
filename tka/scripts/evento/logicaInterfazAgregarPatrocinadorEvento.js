var btnAgregarPatrocinador = document.querySelector("#btnAgregarPatrocinador");
listarPatrocinadoresEvento();
llenarDatosDeEvento();
llenarListaPatrocinadores();

if(btnAgregarPatrocinador != null){
	btnAgregarPatrocinador.addEventListener("click", agregarPatrocinador);
}

function llenarListaPatrocinadores(){
	var listaPatrocinadores = document.querySelector("#nombrePatrocinador");
	var patrocinadores = obtenerPatrocinadores();
	listaPatrocinadores.innerHTML = '';
	for(var i = 0; i < patrocinadores.length; i++) {
		var opt = patrocinadores[i]["id_patrocinador"];
		var el = document.createElement("option");
		
		el.textContent = patrocinadores[i]["nombre"];
		el.value = opt;
		listaPatrocinadores.appendChild(el);
	}
}

function agregarPatrocinador(){
	var idEvento = obtenerId();
	var idPatrocinador = document.querySelector("#nombrePatrocinador").value;
	guardarPatrocinadorPorEvento(Number(idEvento), Number(idPatrocinador));
	
	event.preventDefault();
	event.stopPropagation();
	
	listarPatrocinadoresEvento();
}

function listarPatrocinadoresEvento() {
	var listaPatrocinadoresPorEvento = obtenerPatrocinadorPorEvento();
	var td, texto, fila;
	var tbody = document.querySelector("#tablaPatrocinadoresEvento tbody");

	tbody.innerHTML ="";
	
	if(listaPatrocinadoresPorEvento != []){

		
		for (var i = 0; i < listaPatrocinadoresPorEvento.length; i++) {
			
				document.querySelector("#tablaPatrocinadoresEvento").style.display = "";
				fila = tbody.insertRow(i);
				td = fila.insertCell();
				texto = document.createTextNode(listaPatrocinadoresPorEvento[i]["nombre"]);
				td.appendChild(texto);

				
				var td = fila.insertCell();
				var btnEliminar = document.createElement('button');

				btnEliminar.type = "button";
				btnEliminar.value = "Eliminar";
				btnEliminar.name =  listaPatrocinadoresPorEvento[i]["id_patrocinador"];
				btnEliminar.classList="btn btnDelete fa fa-trash";
				btnEliminar.addEventListener("click", eliminarPatrocinador);

				td.appendChild(btnEliminar);
			
		}
	}
}