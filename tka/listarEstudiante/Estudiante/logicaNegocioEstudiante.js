/*************************************************************************************************************
*											  Template														 *
**************************************************************************************************************
*	COSAS SE MOFICAN DE ESTE TEMPLATE:
*		~cambiar el pestudianteNuevo por la variable que deseen usen ctrl+h y replace all para hacerlo y evitar errores
*		~cambiar la palabra estudiante por lo que esta trabajando: estudiante, categoria, etc
*		~ si se necesita un contador de id's adicional agregarlo pero especicar con un nombre difrente



*/
function obtenerListaestudiantes() {
	var listaestudiantes = JSON.parse(localStorage.getItem('listaestudiantesLS'));

	if(listaestudiantes == null){
		listaestudiantes = [];
	}

	return listaestudiantes;
}

function agregarestudiante(pestudianteNuevo) {
	listaestudiantes = obtenerListaestudiantes();
	idestudiante = devolverId('listaIdestudianteLS');
	pestudianteNuevo.unshift(idestudiante);//pone de primer elemento al id
	listaestudiantes.push(pestudianteNuevo)
	localStorage.setItem('listaestudiantesLS', JSON.stringify(listaestudiantes));
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

function buscarestudianteCodigo(iCodigo) {
	var listaestudiantes = obtenerListaestudiantes();
	var arrestudiantesEncontrado = [];
	for (var i = 0; i < listaestudiantes.length; i++) {
		if(listaestudiantes[i][0]== iCodigo){
			arrestudianteEncontrado = listaestudiantes[i]
		}
	}
	return arrestudianteEncontrado;
}

function modificarestudiante(estudianteModificado) {
	var listaestudiantes = obtenerListaestudiantes();
	for (var i = 0; i < listaestudiantes.length; i++) {
		if(listaestudiantes[i][0]=== estudianteModificado[0]){
			estudianteModificado[estudianteModificado.length-1]=listaestudiantes[i][listaestudiantes[i].length-1];
			listaestudiantes[i] = estudianteModificado;
		}
	}

	localStorage.setItem('listaestudiantesLS', JSON.stringify(listaestudiantes));
}

function desactivarActivarestudiante(id, activado) {
		var listaestudiantes = obtenerListaestudiantes();
	for (var i = 0; i < listaestudiantes.length; i++) {
		if(listaestudiantes[i][0]=== id){
			listaestudiantes[i][listaestudiantes[i].length-1] = activado;
		}
	}

	localStorage.setItem('listaestudiantesLS', JSON.stringify(listaestudiantes));

}
