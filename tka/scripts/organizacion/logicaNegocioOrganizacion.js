
function obtenerListaOrganizaciones() {
	var listaOrganizaciones = JSON.parse(localStorage.getItem('listaOrganizacionesLS'));

	if(listaOrganizaciones == null){
		listaOrganizaciones = [];
	}

	return listaOrganizaciones;
}

function agregarOrganizacion(pOrganizacionNuevo) {
	listaOrganizaciones = obtenerListaOrganizaciones();
	idOrganizacion = devolverId('listaIdOrganizacionLS');
	pOrganizacionNuevo.unshift(idOrganizacion);//pone de primer elemento al id
	listaOrganizaciones.push(pOrganizacionNuevo)
	localStorage.setItem('listaOrganizacionesLS', JSON.stringify(listaOrganizaciones));
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

function buscarOrganizacionCodigo(iCodigo) {
	var listaOrganizaciones = obtenerListaOrganizaciones();
	var arrOrganizacionEncontrado = [];
	for (var i = 0; i < listaOrganizaciones.length; i++) {
		if(listaOrganizaciones[i][0]== iCodigo){
			arrOrganizacionEncontrado = listaOrganizaciones[i]
		}
	}
	return arrOrganizacionEncontrado;
}

function modificarOrganizacion(OrganizacionModificado) {
	var listaOrganizaciones = obtenerListaOrganizaciones();
	for (var i = 0; i < listaOrganizaciones.length; i++) {
		if(listaOrganizaciones[i][0]=== OrganizacionModificado[0]){
			OrganizacionModificado[OrganizacionModificado.length-1]=listaOrganizaciones[i][listaOrganizaciones[i].length-1];
			listaOrganizaciones[i] = OrganizacionModificado;
		}
	}

	localStorage.setItem('listaOrganizacionesLS', JSON.stringify(listaOrganizaciones));
}

function desactivarActivarOrg(id, activado) {
		var listaOrganizaciones = obtenerListaOrganizaciones();
	for (var i = 0; i < listaOrganizaciones.length; i++) {
		if(listaOrganizaciones[i][0]=== id){
			listaOrganizaciones[i][listaOrganizaciones[i].length-1] = activado;
		}
	}

	localStorage.setItem('listaOrganizacionesLS', JSON.stringify(listaOrganizaciones));

}
