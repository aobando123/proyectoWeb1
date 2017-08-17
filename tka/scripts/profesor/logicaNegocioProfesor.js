function obtenerListaProfesores() {
	var listaProfesores = JSON.parse(localStorage.getItem('listaProfesoresLS'));

	if(listaProfesores == null){
		listaProfesores = [];
	}

	return listaProfesores;
}


function obtenerAcademias(){
	var listaAcademias = JSON.parse(localStorage.getItem('listaAcademiasLS'));

	if(listaAcademias == null){
		listaAcademias = [];
	}
	  
	return listaAcademias;
}


function agregarProfesor(pProfesorNuevo) {
	listaProfesores = obtenerListaProfesores();
	idProfesor = devolverId('listaIdProfesorLS');
	pProfesorNuevo.unshift(idProfesor);//pone de primer elemento al id
	listaProfesores.push(pProfesorNuevo)
	localStorage.setItem('listaProfesoresLS', JSON.stringify(listaProfesores));
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

function buscarProfesorCodigo(iCodigo) {
	var listaProfesores = obtenerListaProfesores();
	var arrProfesorEncontrado = [];
	for (var i = 0; i < listaProfesores.length; i++) {
		if(listaProfesores[i][0]== iCodigo){
			arrProfesorEncontrado = listaProfesores[i]
		}
	}
	return arrProfesorEncontrado;
}

function modificarProfesor(ProfesorModificado) {
	var listaProfesores = obtenerListaProfesores();
	for (var i = 0; i < listaProfesores.length-1; i++) {
		if(listaProfesores[i][0]=== ProfesorModificado[0]){
			ProfesorModificado[ProfesorModificado.length-1]=listaProfesores[i][listaProfesores[i].length-1];
			listaProfesores[i] = ProfesorModificado;
		}
	}

	localStorage.setItem('listaProfesoresLS', JSON.stringify(listaProfesores));
}

function desactivarActivarProfesor(id, activado) {

	var listaProfesores = obtenerListaProfesores();
	for (var i = 0; i < listaProfesores.length; i++) {
		if(listaProfesores[i][0]=== id){
			listaProfesores[i][listaProfesores[i].length-1] = activado;
		}
	}

	localStorage.setItem('listaProfesoresLS', JSON.stringify(listaProfesores));
}


