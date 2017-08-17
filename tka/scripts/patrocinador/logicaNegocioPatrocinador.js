// convertir image a string
function convertirImagen(paPatrocinador, accion) {
  var selectedFile = paPatrocinador[1];//perfil
  var reader = new FileReader();

  reader.onload = function(e) {
  	paPatrocinador[1] = reader.result;
  	if(accion === "agregar"){
  		agregarPatrocinador(paPatrocinador);
  	}
  	else{
  		modificarPatrocinadorImagen(Patrocinador);
  	}
  };
  reader.readAsDataURL(selectedFile);

}


// Funcion que registra los patrocinadores dentro de la base de datos
function agregarPatrocinador(pPatrocinador) {
	var request = $.ajax({
		url: 'services/patrocinador/registrar_patrocinador.php',
		dataType: 'json',
		async: false,
		method: 'post',
		data:{
			'pNombrePatrocinador':pPatrocinador[0],
			'pLogo':pPatrocinador[1],
			'pNombreCompannia':pPatrocinador[2],
			'pEstado':pPatrocinador[3]
		}
	});
	request.done(function(datos){

	});
	request.fail(function(){
		console.log('Error de conexion');
	});
}
// Listar patrocinadores
function obtenerListaPatrocinadores(){
	var listaPatrocinadores = [];

	var request = $.ajax({
		url: 'services/patrocinador/listar_partocinador.php',
		dataType: 'json',
		async: false,
		method: 'get',
		data:{
		}
	});
	request.done(function(datos){
		listaPatrocinadores = datos;
	});
	request.fail(function(){
		console.log('Error de conexion');
	});
	return listaPatrocinadores;
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

function buscarPatrocinadorCodigo(iCodigo) {
	var listaPatrocinadores = obtenerListaPatrocinadores();
	var arrPatrocinadoresEncontrado = [];
	for (var i = 0; i < listaPatrocinadores.length; i++) {
		if(listaPatrocinadores[i][0]== iCodigo){
			arrPatrocinadorEncontrado = listaPatrocinadores[i]
		}
	}
	return arrPatrocinadorEncontrado;
}

function modificarPatrocinador(PatrocinadorModificado) {
	var listaPatrocinadores = obtenerListaPatrocinadores();
	for (var i = 0; i < listaPatrocinadores.length; i++) {
		if(listaPatrocinadores[i][0]=== PatrocinadorModificado[0]){
			PatrocinadorModificado[PatrocinadorModificado.length-1] = listaPatrocinadores[i][listaPatrocinadores[i].length-1];
			listaPatrocinadores[i][1] = patrocinadorModificado[1];
			listaPatrocinadores[i][3] = patrocinadorModificado[3];
			localStorage.setItem('listaPatrocinadoresLS', JSON.stringify(listaPatrocinadores));
		}
	}


}

function desactivarActivarPatrocinador(id, activado) {
	var listaPatrocinadores = obtenerListaPatrocinadores();
	for (var i = 0; i < listaPatrocinadores.length; i++) {
		if(listaPatrocinadores[i][0]=== id){
			listaPatrocinadores[i][listaPatrocinadores[i].length-1] = activado;
		}
	}

	localStorage.setItem('listaPatrocinadoresLS', JSON.stringify(listaPatrocinadores));

}






function buscarPatrocinadorCodigo(iCodigo) {
	var listaPatrocinadores = obtenerListaPatrocinadores();
	var arrPatrocinadorEncontrado = [];
	for (var i = 0; i < listaPatrocinador.length; i++) {
		if(listaPatrocinadores[i][0]== iCodigo){
			arrPatrocinadorncontrado = listaPatrocinadores[i]
		}
	}
	return arrPatrocinadorncontrado;
}

function modificarPatrocinador(patrocinadorModificado) {

	var request = $.ajax({
		url: 'services/patrocinador/modificar_patrocinador.php',
		dataType: 'json',
		async: false,
		method: 'post',
		data:{
			'pidPatrocinio': patrocinadorModificado[0],
			'pnombrePatrocinador': patrocinadorModificado[1],
			'pNombreCompannia':patrocinadorModificado[2],
			'plogoCompannia':patrocinadorModificado[3],
			'pestado':patrocinadorModificado[4]
		}

	});
	request.done(function() {
		llenarTabla();
	});
	request.fail(function() {
		console.log("Error de conexion");
	});



}

function desactivarActivarPatrocinador(id, activado) {
	var sEstado;
	if(activado){
		sEstado = "activo";
	}else{
		sEstado = "desactivo";
	}

	var request = $.ajax({
		url: 'services/asistente/activar_desactivar_patrocinador.php',
		dataType: 'json',
		async: false,
		method: 'post',
		data:{
			'pidPatrocinio': patrocinadorModificado[0],
			'pnombrePatrocinador': patrocinadorModificado[1],
			'pNombreCompannia':patrocinadorModificado[2],
			'plogoCompannia':patrocinadorModificado[3],
			'pestado':patrocinadorModificado[4]
		}

	});
	request.done(function() {
		llenarTabla();
	});
	request.fail(function() {
		console.log("Error de conexion");
	});


}


function modificarPatrocinadorImagen(PatrocinadorModificado){
	var listaPatrocinadores = obtenerListaPatrocinadores();
	for (var i = 0; i < listaPatrocinadores.length; i++) {
		if(listaPatrocinadores[i][0]=== PatrocinadorModificado[0]){
			PatrocinadorModificado[PatrocinadorModificado.length-1]=listaPatrocinadores[i][listaPatrocinadores[i].length-1];
			listaPatrocinadores[i][1] = PatrocinadorModificado[1];
			listaPatrocinadores[i][2] = PatrocinadorModificado[2];
			listaPatrocinadores[i][3] = PatrocinadorModificado[3];
			localStorage.setItem('listaPatrocinadoresLS', JSON.stringify(listaPatrocinadores));

		}
	}
	llenarTabla();

}


//guardar con la imagen
function guardarPatrocinador(arrPatrocinador){
	var request = $.ajax({
		url:'services/asistente/registrar_patrocinador.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pidPatrocinio': patrocinadorModificado[0],
			'pnombrePatrocinador': patrocinadorModificado[1],
			'pNombreCompannia':patrocinadorModificado[2],
			'plogoCompannia':patrocinadorModificado[3],
			'pestado':patrocinadorModificado[4]
		}

	});

	request.done(function () {
		llenarTabla();
	});

	request.fail(function() {
		console.log("Error de conexion");
	});



}

function modificarPatrocinadorImagen(patrocinadorModificado){
	var request = $.ajax({
		url: 'services/patrocinador/modificar_patrocinador.php',
		dataType: 'json',
		async: false,
		method: 'post',
		data:{
			'pidPatrocinio': patrocinadorModificado[0],
			'pfoto': patrocinadorModificado[1],
			'pnombre':patrocinadorModificado[2],
			'pcorreo':patrocinadorModificado[3],
		}

	});
	request.done(function() {
		llenarTabla();
	});
	request.fail(function() {
		console.log("Error de conexion");
	});


}
