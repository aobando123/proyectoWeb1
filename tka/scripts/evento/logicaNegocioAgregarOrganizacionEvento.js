function obtenerOrganizaciones(){
	var organizaciones = []
	var request = $.ajax({
	url: 'services/evento/organizacion/listar_organizacion_no_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
      'pevento': obtenerId()
    },
    success: function(respuesta){
      organizaciones = respuesta;
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      organizaciones = [];
    }
	});

	return organizaciones;
}
	
function obtenerOrganizacionPorEvento(){
var organizaciones = []
	var request = $.ajax({
	url: 'services/evento/organizacion/listar_organizacion_en_evento.php',
    type: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
      'pevento': obtenerId()
    },
    success: function(respuesta){
      organizaciones = respuesta;
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
      organizaciones = [];
    }
	});

	return organizaciones;
}


function obtenerlistaCategorias() {
	var listaCategorias = JSON.parse(localStorage.getItem('listaCategorias'));

	if(listaCategorias == null){
		listaCategorias = [];
	}
	  
	return listaCategorias;
}

function guardarOrganizacionPorEvento(idEvento, idOrganizacion){
var request = $.ajax({
	url: 'services/evento/organizacion/registrar_organizacion_a_evento.php',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
      'pevento': idEvento,
      'pOrganizacion': idOrganizacion
    },
    success: function(respuesta){	
	 event.preventDefault();
	 event.stopPropagation();
	listarOrganizacionesEvento();
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
    }
	});

}

function eliminarOrganizacion(){
var request = $.ajax({
	url: 'services/evento/organizacion/eliminar_organizacion_en_evento.php',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=ISO-8859-15',
    dataType : 'json',
    async:false,
    data:{
      'pevento': obtenerId(),
      'pOrganizacion': event.currentTarget.name
    },
    success: function(respuesta){	
	 event.preventDefault();
	 event.stopPropagation();
	 listarOrganizacionesEvento();
	 llenarListaOrganizaciones();
    },
    error: function(respuesta,error){
      console.log(respuesta + 'error: ' + error);
    }
	});
}