function obtenerEventos() {
	var listaEventos = JSON.parse(localStorage.getItem('listaEventos'));

	if(listaEventos == null){
		listaEventos = [];
	}
	  
	return listaEventos;
}

function buscarEvento(idEvento) {
	var listaEventos = obtenerEventos();
	var eventoEncontrado = [];
	
	for (var i = 0; i < listaEventos.length; i++) {
		
		if(listaEventos[i][0] == idEvento){
			eventoEncontrado = listaEventos[i]
		}
	}
	
	return eventoEncontrado;
}

function obtenerDatosDeEvento() {
	var formulario = document.querySelector(".formularioEvento")
	var elementos;
	
	if(formulario != null)
		elementos = formulario.querySelectorAll('form input:not([type="button"]), form select ');
	
	var arrFormulario = [];
	
	for (var i = 0; i < elementos.length; i++) {
		arrFormulario[i] = elementos[i].value || 0;
	}
	
	return arrFormulario;
}

function modificarEvento(evento) {
	var listaEventos = obtenerEventos();
	
	for (var i = 0; i < listaEventos.length; i++) {
		if(listaEventos[i][0] === evento[0]){
			listaEventos[i] = evento;
		}
	}

	localStorage.setItem('listaEventos', JSON.stringify(listaEventos));
}

function obtenerLugares(){
	var listaLugares = JSON.parse(localStorage.getItem('listaLugaresLS'));

	if(listaLugares == null){
		listaLugares = [];
	}
	  
	return listaLugares;
}