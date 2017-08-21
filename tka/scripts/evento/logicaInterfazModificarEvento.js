var btnActualizar = document.querySelector("#btnModificaar");
if (btnActualizar !== null){
	btnActualizar.addEventListener("click", actualizarEvento);
}



llenarListaLugares();

function llenarDatosDeEvento() {
	var idEvento = obtenerId(); //obtiene el id del evento por medio del url
	var evento = buscarEvento(idEvento);

	document.querySelector("#nombreEvento").value = evento['nombre'];
	document.querySelector("#fechaInicialEvento").value = evento['fechaInicial'];
	document.querySelector("#fechaFinalEvento").value = evento['fechaInicial'];
	document.querySelector("#tipoEvento").value = evento['tipo'];
	document.querySelector("#costoInscripcion").value = evento['costoInscripcion'];
	document.querySelector("#costoEntrada").value = evento['costoEntrada'];
	document.querySelector("#entradasDisponibles").value = evento['cantidadEntradas'];
	document.querySelector("#lugarEvento").value = evento['Lugar_idLugar'];
}

function actualizarEvento()
{
	var listaEventos = obtenerDatosDeEvento();
	var idEvento = obtenerId();
	
	listaEventos.unshift(Number(idEvento));

	
	if(validarEspacio() && validar()){
		modificarEvento(listaEventos);
		llamarAlerta(
			"success",
			"Evento actualizado",
			"Los datos han sido actualizados satisfactoriamente"
		);
	}
	
	
	event.preventDefault();
    event.stopPropagation();
}
function validar(){
	var listaEventos = obtenerDatosDeEvento();
	var valid = true
	for (var i = listaEventos.length - 1; i >= 0; i--) {
		if(listaEventos[i] ===''){
			valid = false;
			llamarAlerta(
			"error",
			"Error en los datos",
			"por favor llene todos los datos"
		);
		}
	}
	return valid;
}
function obtenerId(){
	var url = new URL(window.location.href);
	return url.searchParams.get("id");
}

function llenarListaLugares(){
	var listaLugar = document.querySelector("#lugarEvento");
	var lugares = obtenerLugares();
	for(var i = 0; i < lugares.length; i++) {
		var opt = lugares[i]["idLugar"];
		var el = document.createElement("option");

		el.textContent = lugares[i]["nombre"];
		el.value = opt;
		el.id = lugares[i]["capacidad"];

		listaLugar.appendChild(el);
	}

}

function validarEspacio(){    	
	var lugarEvento = document.querySelector("#lugarEvento");
	var entradasDisponibles = document.querySelector("#entradasDisponibles");  
	
	var cantidadEntradasDisponibles = Number(entradasDisponibles.value);
	var capacidadLugar = Number(lugarEvento[lugarEvento.selectedIndex].getAttribute("id"));
	
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