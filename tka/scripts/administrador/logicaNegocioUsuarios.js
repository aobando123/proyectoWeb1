/*************************************************************************************************************
*											  Template														 *
**************************************************************************************************************
*	COSAS SE MOFICAN DE ESTE TEMPLATE:
*		~cambiar el pUsuarioNuevo por la variable que deseen usen ctrl+h y replace all para hacerlo y evitar errores
*		~cambiar la palabra Usuario por lo que esta trabajando: Usuario, categoria, etc
*		~ si se necesita un contador de id's adicional agregarlo pero especicar con un nombre difrente



*/
function obtenerListaUsuarios() {
	var listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarioLS'));

	if(listaUsuarios == null){
		listaUsuarios = [];
	}

	return listaUsuarios;
}

function filtrarPorAdmin(array){
	return array[array.length-2]==="administrador";
}
function filtrarPorProfesor(array){
	return array[array.length-2]==="profesor";
}
function filtrarPorEstudiante(array){
	return array[array.length-2]==="estudiante";
}
function obtenerAdministradores(){
	return obtenerListaUsuarios().filter(filtrarPorAdmin);
}
function obtenerAsistentes(){
	var listaAsistentes = []
	var request = $.ajax({
		url: 'services/asistente/listar_asistente.php',
    	dataType: 'json',
    	async: false,
    	method: 'get',
	});

	request.done(function (datos) {
		listaAsistentes = datos;
	});
	request.fail(function(){
    console.log('Error de conexion');
  });

	return listaAsistentes;
}
function obtenerUsuario(){
	var usuarios = obtenerListaUsuarios();
	var idUsuario = JSON.parse(sessionStorage.getItem("idUsuarioSS"));
	var usuario;
	for (var i = 0; i < usuarios.length; i++) {
		if(usuarios[i][0]===idUsuario){
			usuario = usuarios[i];
			break;
		}
	}

	return usuario
}

function agregarUsuario(perfil ,nombre, correo, tipo) {
	var claveGenerica= "";
	var arrUsuario=[];
	idUsuario = devolverId('listaIdUsuarioLS');
	//Generamos la clave generica de ese
	claveGenerica = Math.random().toString(36).slice(-8);
	//lo ponemos todo en el array
	arrUsuario.push(perfil,nombre,correo,tipo,claveGenerica);
	convertirImagen(arrUsuario, "agregar");
	//listaUsuarios.push(arrUsuario);
	//localStorage.setItem('listaUsuarioLS', JSON.stringify(listaUsuarios));
}

function devolverId (listaId){
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

function buscarUsuarioCodigo(iCodigo) {
	var listaUsuarios = obtenerListaUsuarios();
	var arrUsuariosEncontrado = [];
	for (var i = 0; i < listaUsuarios.length; i++) {
		if(listaUsuarios[i][0]== iCodigo){
			arrUsuarioncontrado = listaUsuarios[i]
		}
	}
	return arrUsuarioncontrado;
}

function modificarUsuario(usuarioModificado) {

	var request = $.ajax({
		url: 'services/asistente/modificar_asistente.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
    		'pid_usuario': usuarioModificado[3],
    		'pfoto': usuarioModificado[0],
    		'pnombre':usuarioModificado[1],
    		'pcorreo':usuarioModificado[2],
    	}

	});
	request.done(function() {
		llenarTabla();
	});
	request.fail(function() {
		console.log("Error de conexion");
	});
 


}

function desactivarActivarUsuario(id, activado) {
	var sEstado;
	if(activado){
		sEstado = "activo";
	}else{
		sEstado = "desactivo";
	}

	var request = $.ajax({
	url: 'services/asistente/activar_desactivar_asistente.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
    		'pid_usuario': id,
    		'pestado': sEstado
    	}

	});
	request.done(function() {
		llenarTabla();
	});
	request.fail(function() {
		console.log("Error de conexion");
	});
 

}






// convertir image a string
function convertirImagen(usuario, accion) {
  var selectedFile = usuario[0];//perfil
  var reader = new FileReader();


  if (selectedFile === "images/perfil.jpg") {
  	guardarUsuario(usuario)
  }
  else{
  	  reader.onload = function(e) {
    usuario[0] = reader.result;
		if(accion === "agregar"){
			guardarUsuario(usuario);
		}
		else{
			modificarUsuarioImagen(usuario);
		}

  };



  reader.readAsDataURL(selectedFile);
  }

}



//guardar con la imagen
function guardarUsuario(arrUsuario){
	var request = $.ajax({
		url:'services/asistente/registrar_asistente.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pfoto':arrUsuario[0],
			'pnombre': arrUsuario[1],
			'pcorreo': arrUsuario[2],
			'ptipo': arrUsuario[3],
			'pcontrasenna': arrUsuario[4],
		}

	});

	request.done(function () {
		llenarTabla();
	});
	
	request.fail(function() {
		console.log("Error de conexion");
	});
 


}

function modificarUsuarioImagen(usuarioModificado){
	var request = $.ajax({
		url: 'services/asistente/modificar_asistente.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
    		'pid_usuario': usuarioModificado[3],
    		'pfoto': usuarioModificado[0],
    		'pnombre':usuarioModificado[1],
    		'pcorreo':usuarioModificado[2],
    	}

	});
	request.done(function() {
		llenarTabla();
	});
	request.fail(function() {
		console.log("Error de conexion");
	});
 

}
