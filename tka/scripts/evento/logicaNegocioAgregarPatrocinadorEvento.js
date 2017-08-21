function obtenerPatrocinadores(){
	var listaPatrocinadores = [];
	var request = $.ajax({
	url: 'services/evento/patrocinador/listar_patrocinador_sin_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
      'pevento': obtenerId()
    },
    success: function(respuesta){
      listaPatrocinadores = respuesta;
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      listaPatrocinadores = [];
    }
	});
	  
	return listaPatrocinadores;
}
	
function obtenerPatrocinadorPorEvento(){
	var listaPatrocinadores = [];
	var request = $.ajax({
	url: 'services/evento/patrocinador/listar_patrocinadores_con_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
      'pevento': obtenerId()
    },
    success: function(respuesta){
      listaPatrocinadores = respuesta;
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      listaPatrocinadores = [];
    }
	});
	  
	return listaPatrocinadores;
}


function obtenerlistaCategorias() {
	var listaCategorias = JSON.parse(localStorage.getItem('listaCategorias'));

	if(listaCategorias == null){
		listaCategorias = [];
	}
	  
	return listaCategorias;
}

function guardarPatrocinadorPorEvento(idEvento, idPatrocinador){
	var request = $.ajax({
		url:'services/evento/patrocinador/agregar_patrocinador_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':idEvento,
			'pPatrocinador': idPatrocinador
		},
	success: function(respuesta){
	event.preventDefault();
	event.stopPropagation();
      llamarAlerta('success','Patrocinador agregado','');
      llenarListaPatrocinadores();
      listarPatrocinadoresEvento();
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      listaPatrocinadores = [];
    }
	});
}

function eliminarPatrocinador(){
	var request = $.ajax({
		url:'services/evento/patrocinador/eliminar_patrocinador_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':obtenerId(),
			'pPatrocinador': event.currentTarget.name
		},
	success: function(respuesta){
	event.preventDefault();
	event.stopPropagation();
      llamarAlerta('warning','Patrocinador eliminado','');
      llenarListaPatrocinadores();
      listarPatrocinadoresEvento();
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      listaPatrocinadores = [];
    }
	});
}