function obtenerListaAcademias(){
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

function agregarestudiante(pestudianteNuevo){
	listaestudiantes = obtenerListaestudiantes();

	var request = $.ajax({
		url: 'services/estudiantes/registrar_estudiante.php',
		dataType: 'json',
		async: false,
		method: 'post',
		data:{
			'pNombreEstudiante':pestudianteNuevo[0],
			'pApellido1':pestudianteNuevo[1],
			'pApellido2':pestudianteNuevo[2],
			'pTelefono':pestudianteNuevo[3],
			'pGrado':pestudianteNuevo[4],
			'pAltura':pestudianteNuevo[5],
			'pIdAcademia':pestudianteNuevo[6],
			'pGenero':pestudianteNuevo[7],
			'pCorreo':pestudianteNuevo[8],
			'pIdUsuario':pestudianteNuevo[9],
			'pPeso':pestudianteNuevo[10],
			'pTroneos':pestudianteNuevo[11],
			'pFechaNacimiento':pestudianteNuevo[12],
			'pId':pestudianteNuevo[13],
			'pIdProfesor': pestudianteNuevo[14],
			'pEstado': pestudianteNuevo[15]
		}
	});

	request.done(function(datos){

	});
	request.fail(function(){
		console.log('Error de conexion');
	});
}

function obtenerListaEstudiantes() {
	var listaEstudiantes = [];
	var request = $.ajax({
		url: 'services/estudiantes/listar_estudiantes.php',
		dataType: 'json',
		async: false,
		method: 'get',
		data:{
		}
	});
	request.done(function(datos){
		listaEstudiantes = datos;
	});
	request.fail(function(){
		console.log('Error de conexion');
	});
	return listaEstudiantes;
}

function devolverId(listaId){
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

function buscarestudianteCodigo(iCodigo){
	var listaestudiantes = obtenerListaEstudiantes();
	var arrestudiantesEncontrado = [];
	for (var i = 0; i < listaestudiantes.length; i++) {
		if(listaestudiantes[i][0]== iCodigo){
			arrestudianteEncontrado = listaestudiantes[i]
		}
	}
	return arrestudianteEncontrado;
}

function modificarestudiante(estudianteModificado){
	var listaestudiantes = obtenerListaestudiantes();
	for (var i = 0; i < listaestudiantes.length; i++) {
		if(listaestudiantes[i][0]=== estudianteModificado[0]){
			estudianteModificado[estudianteModificado.length-1]=listaestudiantes[i][listaestudiantes[i].length-1];
			listaestudiantes[i] = estudianteModificado;
		}
	}

	localStorage.setItem('listaestudiantesLS', JSON.stringify(listaestudiantes));
}

function desactivarActivarestudiante(id, activado){
	var listaestudiantes = obtenerListaestudiantes();
	for (var i = 0; i < listaestudiantes.length; i++) {
		if(listaestudiantes[i][0]=== id){
			listaestudiantes[i][listaestudiantes[i].length-1] = activado;
		}
	}
	localStorage.setItem('listaestudiantesLS', JSON.stringify(listaestudiantes));
}
