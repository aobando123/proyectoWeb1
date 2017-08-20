
function obtenerListaUsuarios(){
	var listaProfesores = []
	var request = $.ajax({
		url: 'services/usuario/listar_usuario.php',
    	dataType: 'json',
    	async: false,
    	method: 'get',
	});

	request.done(function (datos) {
		listaProfesores = datos;
	});
	
	request.fail(function(error){
		console.log('Error de conexión.' + error);
	});

	return listaProfesores;
}