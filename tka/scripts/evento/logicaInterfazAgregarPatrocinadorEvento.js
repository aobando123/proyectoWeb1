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
	
	for(var i = 0; i < patrocinadores.length; i++) {
		var opt = patrocinadores[i][1];
		var el = document.createElement("option");
		
		el.textContent = opt;
		el.value = opt;
		el.id = patrocinadores[i][0];
		listaPatrocinadores.appendChild(el);
	}
}

function agregarPatrocinador(){
	var idEvento = obtenerId();
	var nombrePatrocinador = document.querySelector("#nombrePatrocinador");
	var idPatrocinador = nombrePatrocinador[nombrePatrocinador.selectedIndex].getAttribute("id");	
	var nombrePatrocinador = nombrePatrocinador.value;	
	guardarPatrocinadorPorEvento(Number(idEvento), Number(idPatrocinador), nombrePatrocinador);
	
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
		var numRow = 0;
		
		for (var i = 0; i < listaPatrocinadoresPorEvento.length; i++) {
			
			if(listaPatrocinadoresPorEvento[i][0] == obtenerId()){
				document.querySelector("#tablaPatrocinadoresEvento").style.display = "";
				fila = tbody.insertRow(numRow);
				
				for (var columna = 1; columna < listaPatrocinadoresPorEvento[i].length-1 ; columna++) {
					
						td = fila.insertCell(columna-1);
						texto = document.createTextNode(listaPatrocinadoresPorEvento[i][columna+1]);
						td.appendChild(texto);
				}
				
				var td = fila.insertCell(listaPatrocinadoresPorEvento[i].length -2);
				var btnEliminar = document.createElement('button');

				btnEliminar.type = "button";
				btnEliminar.value = "Eliminar";
				btnEliminar.name =  listaPatrocinadoresPorEvento[i][1];
				btnEliminar.classList="btn btnDelete fa fa-trash";
				btnEliminar.addEventListener("click", eliminarPatrocinador);

				td.appendChild(btnEliminar);
			}
		}
	}
}