function obtenerAdministradores(){
	var listaAdministradores = []
	var request = $.ajax({
		url: 'services/administrador/listar_administrador.php',
    	dataType: 'json',
    	async: false,
    	method: 'get',
	});

	request.done(function (datos) {
		listaAdministradores = datos;
	});
	request.fail(function(){
    console.log('Error de conexion');
  });

	return listaAdministradores;
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

function convertirImagen(usuario, accion) {
  var selectedFile = usuario[0];//perfil
  var reader = new FileReader();


  if (selectedFile === "images/perfil.jpg") {
  	guardarUsuario(usuario);
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
		url:'services/administrador/registrar_administrador.php',
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

function desactivarActivarUsuario(id, activado) {
	var sEstado;
	if(activado){
		sEstado = "activo";
	}else{
		sEstado = "desactivo";
	}

	var request = $.ajax({
	url: 'services/administrador/activar_desactivar_administrador.php',
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
function modificarUsuario(usuarioModificado) {

	var request = $.ajax({
		url: 'services/administrador/modificar_administrador.php',
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

function modificarUsuarioImagen(usuarioModificado){
	var request = $.ajax({
		url: 'services/administrador/modificar_administrador.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
    		'pid_usuario': usuarioModificado[3],
    		'pfoto': usuarioModificado[0],
    		'pnombre':usuarioModificado[2],
    		'pcorreo':usuarioModificado[1],
    	}

	});
	request.done(function() {
		llenarTabla();
	});
	request.fail(function() {
		console.log("Error de conexion");
	});
 

}