// JavaScript Document
function obtenerEvento(idEvento) {

var listaEventos = [];
	var request = $.ajax({
		url:'services/evento/paginaInicio/listar_eventos.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':idEvento
		}
	});
	request.done(function (datos) {
		listarEventos = datos;
	});
	request.fail(function () {
		console.log("fail");
	})
	return listarEventos;
}

function obtenerlistaReservas() {
	var listaReservas = JSON.parse(localStorage.getItem('listaReservasEntradas'));

	if(listaReservas == null){
		listaReservas = [];
	}
	  
	return listaReservas;
}

function obtenerlistaGanancias() {
	var listaGanancias = JSON.parse(localStorage.getItem('listaTotalGananciasPorEvento'));

	if(listaGanancias == null){
		listaGanancias = [];
	}
	  
	return listaGanancias;
}

function registrarReserva(pidEvento, reserva) {
	
	var request = $.ajax({
		url:'services/evento/paginaInicio/realizar_reserva.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':pidEvento,
			'pnombre':reserva[0],
			'pcorreo':reserva[1],
			'ptelefono':reserva[2]
		}
	});
		request.done(function () {
		llamarAlerta("success","Reserva realizada","reserva se registro correctamente");
	});
	
}
function restarReserva(cantidadReserva,evento) {
var request = $.ajax({
		url:'services/evento/paginaInicio/restar_reserva.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'cantidadReserva':cantidadReserva,
			'idEvento': evento
		}
	});
		request.fail(function () {
			console.log("fail");
	});
}

function devolverIdReserva (listaId){
	//Si no exite la lista de ID
	if(localStorage.getItem(listaId) === null){
		//Crear lista de Ids
		var id = 1;
		localStorage.setItem(listaId, JSON.stringify(id));
	}
	else{
		var id = localStorage.getItem(listaId);
		id++;
		localStorage.setItem(listaId, JSON.stringify(id));
	}

	return id;
}