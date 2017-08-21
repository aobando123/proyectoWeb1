function obtenerEventos() {
	var listaEventos = JSON.parse(localStorage.getItem('listaEventos'));

	if(listaEventos == null){
		listaEventos = [];
	}
	  
	return listaEventos;
}

function buscarEvento(idEvento) {
	var eventoEncontrado;
var request = $.ajax({
	url: 'services/evento/buscar_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
      'pevento': idEvento
      },
    success: function(respuesta){
      eventoEncontrado = respuesta;
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      eventoEncontrado = [];
    }
	});
	
	return eventoEncontrado[0];
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
	
var request = $.ajax({
	url: 'services/evento/modificar_evento.php',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
    	'pidEvento': evento[0],
    	'pnombre':evento[1],
    	'pfechaIni':evento[2],
    	'pfechaFin':evento[3],
    	'ptipo':evento[4],
    	'pcostoInscrpcion': evento[5],
    	'pcostoEn': evento[6],
    	'pEntradas':evento[7],
    	'pLugar': evento[8],

    },

    success: function(respuesta){
      llamarAlerta("success",
		"Evento registrado",
		"Los datos han sido actualizados satisfactoriamente"
	);
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);

    }
	});

	localStorage.setItem('listaEventos', JSON.stringify(listaEventos));
}

function obtenerLugares(){
var listaLugares;
	var request = $.ajax({
	url: 'services/evento/lista_lugares_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,

    success: function(respuesta){
      	listaLugares =respuesta;
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      listaLugares = [];
    }
	});

	return listaLugares;
}