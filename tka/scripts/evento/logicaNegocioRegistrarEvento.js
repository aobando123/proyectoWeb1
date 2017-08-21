function obtenerlistaEventos() {
	var listaEventos = JSON.parse(localStorage.getItem('listaEventos'));

	if(listaEventos == null){
		listaEventos = [];
	}
	  
	return listaEventos;
}



function agregarItem(pItemNuevo) {
	var request = $.ajax({
	url: 'services/evento/registrar_evento.php',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
    	'pnombre':pItemNuevo[0],
    	'pfechaIni':pItemNuevo[1],
    	'pfechaFin':pItemNuevo[2],
    	'ptipo':pItemNuevo[3],
    	'pcostoInscrpcion': pItemNuevo[4],
    	'pcostoEn': pItemNuevo[5],
    	'pEntradas':pItemNuevo[6],
    	'pLugar': pItemNuevo[7],

    },

    success: function(respuesta){
      llamarAlerta("success",
		"Evento registrado",
		"Los datos han sido actualizados satisfactoriamente"
	);
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);

    }
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
function  llamarLugares() {
	var listaLugares;
	var request = $.ajax({
	url: 'services/evento/lista_lugares_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,

    success: function(respuesta){
      	listaLugares =respuesta;
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      listaLugares = [];
    }
	});

	return listaLugares;

}