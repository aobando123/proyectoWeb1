/*************************************************************************************************************
*											  Template														 *
**************************************************************************************************************
*	COSAS SE MOFICAN DE ESTE TEMPLATE:
*		~cambiar el pLugarNuevo por la variable que deseen usen ctrl+h y replace all para hacerlo y evitar errores
*		~cambiar la palabra Lugar por lo que esta trabajando: lugar, categoria, etc
*		~ si se necesita un contador de id's adicional agregarlo pero especicar con un nombre difrente



*/
function obtenerListaLugares() {
	var listaLugares = JSON.parse(localStorage.getItem('listaLugaresLS'));

	if(listaLugares == null){
		listaLugares = [];
	}

	return listaLugares;
}

function agregarLugar(pLugarNuevo) {
	listaLugares = obtenerListaLugares();
	idLugar = devolverId('listaIdLugarLS');
	pLugarNuevo.unshift(idLugar);//pone de primer elemento al id
	listaLugares.push(pLugarNuevo)
	localStorage.setItem('listaLugaresLS', JSON.stringify(listaLugares));
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

function buscarLugarCodigo(iCodigo) {
	var listaLugares = obtenerListaLugares();
	var arrLugaresEncontrado = [];
	for (var i = 0; i < listaLugares.length; i++) {
		if(listaLugares[i][0]== iCodigo){
			arrLugarEncontrado = listaLugares[i]
		}
	}
	return arrLugarEncontrado;
}

function modificarLugar(LugarModificado) {
	var listaLugares = obtenerListaLugares();
	for (var i = 0; i < listaLugares.length; i++) {
		if(listaLugares[i][0]=== LugarModificado[0]){
			LugarModificado[LugarModificado.length-1]=listaLugares[i][listaLugares[i].length-1];
			listaLugares[i] = LugarModificado;
		}
	}

	localStorage.setItem('listaLugaresLS', JSON.stringify(listaLugares));
}

function desactivarActivarLugar(id, activado) {
		var listaLugares = obtenerListaLugares();
	for (var i = 0; i < listaLugares.length; i++) {
		if(listaLugares[i][0]=== id){
			listaLugares[i][listaLugares[i].length-1] = activado;
		}
	}

	localStorage.setItem('listaLugaresLS', JSON.stringify(listaLugares));

}
