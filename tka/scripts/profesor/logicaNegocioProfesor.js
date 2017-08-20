function obtenerListaProfesores(){
	var listaProfesores = []
	var request = $.ajax({
		url: 'services/profesor/listar_profesor.php',
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

function obtenerProfesorPorId(id){
	var listaProfesor = []
	var request = $.ajax({
		url: 'services/profesor/obtener_profesor_por_id.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
		data:{
			'pid_usuario':id,
		}
	});

	request.done(function (datos) {
		listaProfesor = datos;
	});
	
	request.fail(function(error){
		console.log('Error de conexión.' + error);
	});

	return listaProfesor;
}

function obtenerProfesorPorCorreo(correo){
	var usuario = []
	var request = $.ajax({
		url: 'services/usuario/obtener_usuario_por_correo.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
		data:{
			'pcorreo': correo,
		}
	});

	request.done(function (datos) {
		usuario = datos;
	});
	
	request.fail(function(error){
		console.log('Error de conexión.' + error);
	});

	return usuario;
}

function obtenerProfesorPorIdUsuario(idUsuario){
	var profesor = []
	var request = $.ajax({
		url: 'services/profesor/obtener_profesor_por_idUsuario.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
		data:{
			'pid_usuario': idUsuario,
		}
	});

	request.done(function (datos) {
		profesor = datos;
	});
	
	request.fail(function(error){
		console.log('Error de conexión.' + error);
	});

	return profesor;
}

function obtenerAcademiasPorProfesor(id){
	var listaAcademias = []
	var request = $.ajax({
		url: 'services/profesor/obtener_academia_por_profesor.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
		data:{
			'pid_usuario': id,
		}
	});

	request.done(function (datos) {
		listaAcademias = datos;
	});
	
	request.fail(function(error){
		console.log('Error de conexión.' + error);
	});	  
	
	return listaAcademias;
}

function obtenerAcademias(){
	var listaAcademias = []
	var request = $.ajax({
		url: 'services/academia/obtener_academias.php',
    	dataType: 'json',
    	async: false,
    	method: 'get',
    	data: {}
	});

	request.done(function (datos) {
		listaAcademias = datos;
	});
	
	request.fail(function(error){
		console.log('Error de conexión.' + error);
	});	  
	
	return listaAcademias;
}

function obtenerCorreos(){
	var listaAcademias = []
	var request = $.ajax({
		url: 'services/profesor/obtener_correos.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data: {}
	});

	request.done(function (datos) {
		listaAcademias = datos;
	});
	
	request.fail(function(error){
		console.log('Error de conexión.' + error);
	});	  
	
	return listaAcademias;
}

function agregarUsuario(arrUsuario) {
	var request = $.ajax({
		url:'services/usuario/registrar_profesor.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pfoto': "",
			'pnombre': arrUsuario[0],
			'pcorreo': arrUsuario[4],
			'ptipo': "Profesor",
			'pcontrasenna': "", //falta
			'pprimer_apellido': arrUsuario[1],
			'psegundo_apellido': arrUsuario[2]
		}
	});

	request.done(function () {
		var idUsuario = obtenerProfesorPorCorreo(arrUsuario[4]);
		agregarProfesor(arrUsuario, idUsuario[0]["idUsuario"]);
	});
	
	request.fail(function(error) {
		console.log("Error de conexión. ");
	});
}

function agregarProfesor(arrUsuario, idUsuario) {
	var request = $.ajax({
		url:'services/profesor/registrar_profesor.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pidentificacion':arrUsuario[3],
			'pfechaNacimiento': arrUsuario[8],
			'pedad': arrUsuario[9],
			'ptelefono': arrUsuario[5],
			'pUsuario_idUsuario': idUsuario,
			'pgenero': arrUsuario[6]
		}
	});

	request.done(function () {
		var profesor = obtenerProfesorPorIdUsuario(idUsuario);
		agregarAcademiaPorProfesor(profesor[0]["idProfesor"], arrUsuario[7]);
	});
	
	request.fail(function(error) {
		console.log("Error de conexion");
	});
}

function agregarAcademiaPorProfesor(idProfesor, idAcademia) {
	var request = $.ajax({
		url:'services/profesor/registrar_academia_por_profesor.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pidProfesor': idProfesor,
			'pidAcademia': idAcademia
		}
	});

	request.done(function () {
		llenarTabla();
	});
	
	request.fail(function(error) {
		console.log("Error de conexion");
	});
}

function buscarProfesorCodigo(iCodigo) {
	var listaProfesores = obtenerListaProfesores();
	var arrProfesorEncontrado = [];
	for (var i = 0; i < listaProfesores.length; i++) {
		if(listaProfesores[i][0] == iCodigo){
			arrProfesorEncontrado = listaProfesores[i]
		}
	}
	return arrProfesorEncontrado;
}


function modificarUsuario(datos) {
	var request = $.ajax({
		url: 'services/usuario/modificar_usuario.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
			'pnombre':datos[0],
			'pcorreo': datos[4],
			'pid_Usuario': datos[9],
			'pprimer_apellido': datos[1],
			'psegundo_apellido': datos[2],
    	}
	});
	
	request.done(function() {
		modificarProfesor(datos);
	});
	
	request.fail(function(event) {
		console.log("Error de conexion" + event);
	});
}

function modificarProfesor(datos) {
	var request = $.ajax({
		url: 'services/profesor/modificar_profesor.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
			'pfechaNacimiento':datos[8],
			'pedad': datos[10],
			'ptelefono': datos[5],
			'pgenero': datos[6],
			'pUsuario_idUsuario': datos[9],
    	}
	});
	
	request.done(function() {
		modificarAcademiaPorProfesor(datos[7], datos[9]);
	});
	
	request.fail(function(event) {
		console.log("Error de conexion" + event);
	});
}


function modificarAcademiaPorProfesor(idAcademia, idProfesor) {
	var request = $.ajax({
		url: 'services/profesor/modificar_academia_por_profesor.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
			'pid_academia':idAcademia,
			'pid_profesor': idProfesor
    	}
	});
	
	request.done(function() {
		llenarTabla();
	});
	
	request.fail(function(event) {
		console.log("Error de conexion" + event);
	});
}

function desactivarActivarProfesor(profesor, activar) {
	var request = $.ajax({
	url: 'services/profesor/activar_desactivar_profesor.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
    		'pusuario_idUsuario': Number(profesor.name),
    		'pestado': activar
    	}
	});
	
	request.done(function(event) {
		var claseOjo = activar === false ? "fa-eye" : "fa-eye-slash";
		profesor.classList = "btn btnIcono fa "+ claseOjo;
		profesor.value = activar === false ? "Activar" : "Desactivar";
	});
	
	request.fail(function() {
		console.log("Error de conexion");
	});
}