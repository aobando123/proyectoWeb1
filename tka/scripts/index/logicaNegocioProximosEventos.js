// JavaScript Document
function obtenerlistaEventos() {
	var listaEventos = [];
	var request = $.ajax({
		url:'services/evento/paginaInicio/listar_eventos.php',
		dataType:'json',
		async:false,
		method:'Post'
	});
	request.done(function (datos) {
		listarEventos = datos;
	});
	request.fail(function () {
		console.log("fail");
	})
	return listarEventos;
}