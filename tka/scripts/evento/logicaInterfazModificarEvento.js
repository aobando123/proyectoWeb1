var btnActualizar = document.querySelector("#btnModificaar");
if (btnActualizar !== null){
	btnActualizar.addEventListener("click", actualizarEvento);
}

llenarListaLugares();

function llenarDatosDeEvento() {
	var idEvento = obtenerId(); //obtiene el id del evento por medio del url
	var evento = buscarEvento(idEvento);

	document.querySelector("#nombreEvento").value = evento[1];
	document.querySelector("#fechaInicialEvento").value = evento[2];
	document.querySelector("#fechaFinalEvento").value = evento[3];
	document.querySelector("#tipoEvento").value = evento[4];
	document.querySelector("#costoInscripcion").value = evento[5];
	document.querySelector("#costoEntrada").value = evento[6];
	document.querySelector("#entradasDisponibles").value = evento[7];
	document.querySelector("#lugarEvento").value = evento[8];
}

function actualizarEvento()
{
	var listaEventos = obtenerDatosDeEvento();
	var idEvento = obtenerId();
	
	listaEventos.unshift(Number(idEvento));
	modificarEvento(listaEventos);
	
	if(validarEspacio()){
		llamarAlerta(
			"success",
			"Evento actualizado",
			"Los datos han sido actualizados satisfactoriamente"
		);
	}
	
	
	event.preventDefault();
    event.stopPropagation();
}

function obtenerId(){
	var url = new URL(window.location.href);
	return url.searchParams.get("id");
}

function llenarListaLugares(){
	var listaLugar = document.querySelector("#lugarEvento");
	var lugares = obtenerLugares();
	
	for(var i = 0; i < lugares.length; i++) {
		var opt = lugares[i][1];
		var el = document.createElement("option");
		
		el.textContent = opt;
		el.value = opt;
		el.id = lugares[i][0];
		el.setAttribute("data-espacio", lugares[i][5]);
		listaLugar.appendChild(el);
	}
}

function validarEspacio(){    	
	var lugarEvento = document.querySelector("#lugarEvento");
	var entradasDisponibles = document.querySelector("#entradasDisponibles");  
	
	var cantidadEntradasDisponibles = Number(entradasDisponibles.value);
	var capacidadLugar = Number(lugarEvento[lugarEvento.selectedIndex].getAttribute("data-espacio"));
	
	if(cantidadEntradasDisponibles > capacidadLugar || cantidadEntradasDisponibles < 0 ){
		llamarAlerta(
			"error",
			"Error en los datos",
			"La cantidad de entradas disponibles no es correcta"
		);
		
		return false;
	}		
	
	return true;
}