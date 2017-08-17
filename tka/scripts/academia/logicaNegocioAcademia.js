function obtenerListaAcademias() {
	var listaAcademias = [];

	var request = $.ajax({
		url: 'services/academias/listar_academias.php',
		dataType: 'json',
		async: false,
		method: 'get',
		data:{
		}
	});
	request.done(function(datos){
		listaAcademias = datos;
	});
	request.fail(function(){
		console.log('Error de conexion');
	});
	return listaAcademias;
}
// Funcion que registra los patrocinadores dentro de la base de datos
function agregarAcademia(pAcademiaNuevo) {
	var request = $.ajax({
		url: 'services/academias/registrar_academias.php',
		dataType: 'json',
		async: false,
		method: 'post',
		data:{
			'pNombreAcademia':pAcademiaNuevo[0],
			'pUbicacion':pAcademiaNuevo[1],
			'pTelefono':pAcademiaNuevo[2],
			'pPersonaContacto':pAcademiaNuevo[3],
			'pCorreo':pAcademiaNuevo[4]
		}
	});
	request.done(function(datos){

	});
	request.fail(function(){
		console.log('Error de conexion');
	});
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

function buscarAcademiaCodigo(iCodigo) {
	var listaAcademias = obtenerListaAcademias();
	var arrAcademiasEncontrado = [];
	for (var i = 0; i < listaAcademias.length; i++) {
		if(listaAcademias[i][0]== iCodigo){
			arrAcademiaEncontrado = listaAcademias[i]
		}
	}
	return arrAcademiaEncontrado;
}

function modificarAcademia(AcademiaModificado) {
	var listaAcademias = obtenerListaAcademias();
	for (var i = 0; i < listaAcademias.length; i++) {
		if(listaAcademias[i][0]=== AcademiaModificado[0]){
			AcademiaModificado[AcademiaModificado.length-1]=listaAcademias[i][listaAcademias[i].length-1];
			listaAcademias[i] = AcademiaModificado;
		}
	}

	localStorage.setItem('listaAcademiasLS', JSON.stringify(listaAcademias));
}

function desactivarActivarAcademia(id, activado) {
		var listaAcademias = obtenerListaAcademias();
	for (var i = 0; i < listaAcademias.length; i++) {
		if(listaAcademias[i][0]=== id){
			listaAcademias[i][listaAcademias[i].length-1] = activado;
		}
	}

	localStorage.setItem('listaAcademiasLS', JSON.stringify(listaAcademias));

}
