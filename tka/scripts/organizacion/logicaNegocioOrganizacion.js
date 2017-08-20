function obtenerOrganizaciones(){
	var listaOrganizaciones = []
	var request = $.ajax({
		url: 'services/organizacion/listar_organizacion.php',
    	dataType: 'json',
    	async: false,
    	method: 'get',
	});

	request.done(function (datos) {
		listaOrganizaciones = datos;
	});
	
	request.fail(function(){
		console.log('Error de conexión.');
	});

	return listaOrganizaciones;
}

function agregarOrganizacion(arrUsuario) {
	var request = $.ajax({
		url:'services/organizacion/registrar_organizacion.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pnombre':arrUsuario[0],
			'ptipo': arrUsuario[2],
			'pdescripcion': arrUsuario[3],
			'pcodigo': arrUsuario[1]
		}
	});

	request.done(function () {
		llenarTabla();
	});
	
	request.fail(function() {
		console.log("Error de conexion");
	});
}

function buscarOrganizacionCodigo(iCodigo) {
	var listaOrganizaciones = obtenerOrganizaciones();
	var arrOrganizacionEncontrado = [];
	
	for (var i = 0; i < listaOrganizaciones.length; i++) {
		if(listaOrganizaciones[i]["idOrganizacion"] == iCodigo){
			arrOrganizacionEncontrado = listaOrganizaciones[i]
		}
	}
	return arrOrganizacionEncontrado;
}

function modificarOrganizacion(datos) {
	var request = $.ajax({
		url: 'services/organizacion/modificar_organizacion.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
			'pnombre':datos[0],
			'ptipo': datos[2],
			'pdescripcion': datos[3],
			'pcodigo': datos[1],
			'pid_organizacion': datos[4],
    	}
	});
	
	request.done(function() {
		llenarTabla();
	});
	
	request.fail(function(event) {
		console.log("Error de conexion" + event);
	});
 
}

function desactivarActivarOrg(organizacion, activado) {
	var request = $.ajax({
	url: 'services/organizacion/activar_desactivar_organizacion.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
    		'pid_organizacion': Number(organizacion.name),
    		'pestado': activado
    	}

	});
	
	request.done(function() {
		var claseOjo = activado === false ? "fa-eye" : "fa-eye-slash";
		organizacion.classList = "btn btnIcono fa "+ claseOjo;
		organizacion.value = activado === false ? "Activar" : "Desactivar";
	});
	
	request.fail(function() {
		console.log("Error de conexion");
	});
}