function obtenerlistaEventos() {
	var listaEventos = [];

	var request = $.ajax({
	url: 'services/evento/listar_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,

    success: function(respuesta){
      	listaEventos = respuesta
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      listaLugares = [];
    }
	});
	return listaEventos;
}

function agregarItem(pItemNuevo) {
	listaEventos = obtenerlistaEventos();
	idItem = devolverId('listaIdEventos');
	pItemNuevo.unshift(idItem);//pone de primer elemento al id
	listaEventos.push(pItemNuevo)
	localStorage.setItem('listaEventos', JSON.stringify(listaEventos));
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

function buscarItemCodigo(iCodigo) {
	var listaEventos = obtenerlistaEventos();
	var arrItemsEncontrado = [];
	
	for (var i = 0; i < listaEventos.length; i++) {
		
		if(listaEventos[i][0]== iCodigo){
			arrItemEncontrado = listaEventos[i]
		}
	}
	
	return arrItemEncontrado;
}

function modificarItem(itemModificado) {
	var listaEventos = obtenerlistaEventos();
	
	for (var i = 0; i < listaEventos.length; i++) {
		if(listaEventos[i][0] === itemModificado[0]){
			listaEventos[i] = itemModificado;
		}
	}

	localStorage.setItem('listaEventos', JSON.stringify(listaEventos));
}

function desactivarActivarItem(id, activar) {
	var listaEventos = obtenerlistaEventos();
	
	for (var i = 0; i < listaEventos.length; i++) {
		if(listaEventos[i][0]=== id){
			listaEventos[i][listaEventos[i].length-1] = activar;
		}
	}

	localStorage.setItem('listaEventos', JSON.stringify(listaEventos));
}