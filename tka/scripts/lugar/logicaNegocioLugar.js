/*************************************************************************************************************
*											  Template														 *
**************************************************************************************************************
*	COSAS SE MOFICAN DE ESTE TEMPLATE:
*		~cambiar el pLugarNuevo por la variable que deseen usen ctrl+h y replace all para hacerlo y evitar errores
*		~cambiar la palabra Lugar por lo que esta trabajando: lugar, categoria, etc
*		~ si se necesita un contador de id's adicional agregarlo pero especicar con un nombre difrente



*/
function obtenerLugares(){
	var listaLugares = []
	var request = $.ajax({
		url: 'services/lugar/listarLugares.php',
    	dataType: 'json',
    	async: false,
    	method: 'get',
	});

	request.done(function (datos) {
		listaLugares = datos;
	});
	
	request.fail(function(){
		console.log('Error de conexión.');
	});

	return listaLugares;
}

//
function obtenerHorarioLugares(pIdLugar){
	var listaHorario = []
	var request = $.ajax({
		url: 'services/lugar/listarHorarioLugares.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
		data:{
			'pIdLugar':pIdLugar,
		}
	});

	request.done(function (datos) {
		listaHorario = datos;
	});
	
	request.fail(function(){
		console.log('Error de conexión.');
	});

	return listaHorario;
}
//

function agregarLugar(pLugarNuevo) {
	
	var request = $.ajax({
		url:'services/lugar/registrarLugar.php',
		dataType:'json',
		async:false,
		method:'post',
		data:{
			'pnombre':pLugarNuevo[0],
			'pubicacion': pLugarNuevo[1],
			'ptelefono': pLugarNuevo[2],
			'pcapacidad': pLugarNuevo[3],
			'platitud': pLugarNuevo[18],
			'plongitud': pLugarNuevo[19],
		}
	});

	request.done(function () {
		console.log("Lugar agregado con exito");
		obtenerUltimoId(pLugarNuevo);
	});
	
	request.fail(function() {
		console.log("Error al agregar lugar");
	});
	
}

function obtenerUltimoId(pLugarNuevo){
	
  var req = $.ajax({
    url: 'services/lugar/obtenerUltimoId.php',
    dataType: 'json',
    async:false,
    method: 'post',
	});
  req.done( function( respuesta ) {
    if(respuesta != null){
		console.log('Ultimo id obtenido con exito')
		agregarHorario(pLugarNuevo, respuesta['id']);
		}
  });
  
  req.fail(function() {
    console.log('error al obtener ultimo id')
  });
  
	}

//function Agregar Horario
function agregarHorario(pLugarNuevo, pUltimoId){
	////// Agregar Horario
	var request = $.ajax({
			url:'services/lugar/registrarHorarioLugar.php',
			dataType:'json',
			async:false,
			method:'post',
			data:{
				'pultimoid': pUltimoId,
				'pdomingoentrada': pLugarNuevo[4],
				'pdomingosalida': pLugarNuevo[5],
				'plunesentrada': pLugarNuevo[6],
				'plunessalida': pLugarNuevo[7],
				'pmartesentrada': pLugarNuevo[8],
				'pmartessalida': pLugarNuevo[9],
				'pmiercolesentrada': pLugarNuevo[10],
				'pmiercolessalida': pLugarNuevo[11],
				'pjuevesentrada': pLugarNuevo[12],
				'pjuevessalida': pLugarNuevo[13],
				'pviernesentrada': pLugarNuevo[14],
				'pviernessalida': pLugarNuevo[15],
				'psabadoentrada': pLugarNuevo[16],
				'psabadosalida': pLugarNuevo[17],
			}
		});

		request.done(function () {
			console.log("Horario agregado con exito");
		});

		request.fail(function() {
    	console.log('error al agregar horario');
  });
	}

function buscarLugarCodigo(pCodigo) {
	var lugar = [];
	var req = $.ajax({
    url: 'services/lugar/buscarLugarCodigo.php',
    dataType: 'json',
    async:false,
    method: 'post',
    data:{
      'pcodigo' : pCodigo,
    }
  	});
		
	req.done( function(respuesta) {
		console.log('Lugar por id encontrado');
		lugar = respuesta;
	});
	
	req.fail(function() {
		console.log('error al buscar lugar por id');
	});
	
	return lugar;
	}





function modificarLugar(LugarModificado) {
	var request = $.ajax({
		url: 'services/lugar/modificarLugar.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
			'pidlugar':LugarModificado[0],
			'pnombre':LugarModificado[1],
			'pubicacion': LugarModificado[2],
			'ptelefono': LugarModificado[3],
			'pcapacidad': LugarModificado[4],
			'platitud': LugarModificado[19],
			'plongitud': LugarModificado[20],
    	}
	});
	
	request.done(function() {
		borrarHorarioLugar(LugarModificado);
		llenarTabla();
	});
	
	request.fail(function(event) {
		console.log("Error de conexion" + event);
	});
}

function borrarHorarioLugar(pLugarModificado) {
	var request = $.ajax({
		url: 'services/lugar/borrarHorario.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
			'pidlugar':pLugarModificado[0],
    	}
	});
	
	request.done(function() {
		sobreEscribirHorarioLugar(pLugarModificado);
	});
	
	request.fail(function(event) {
		console.log("Error de conexion" + event);
	});
}

function sobreEscribirHorarioLugar(pLugarModificado){
	////// Agregar Horario
	var request = $.ajax({
			url:'services/lugar/registrarHorarioLugar.php',
			dataType:'json',
			async:false,
			method:'post',
			data:{
				'pultimoid': pLugarModificado[0],
				'pdomingoentrada': pLugarModificado[5],
				'pdomingosalida': pLugarModificado[6],
				'plunesentrada': pLugarModificado[7],
				'plunessalida': pLugarModificado[8],
				'pmartesentrada': pLugarModificado[9],
				'pmartessalida': pLugarModificado[10],
				'pmiercolesentrada': pLugarModificado[11],
				'pmiercolessalida': pLugarModificado[12],
				'pjuevesentrada': pLugarModificado[13],
				'pjuevessalida': pLugarModificado[14],
				'pviernesentrada': pLugarModificado[15],
				'pviernessalida': pLugarModificado[16],
				'psabadoentrada': pLugarModificado[17],
				'psabadosalida': pLugarModificado[18],
			}
		});

		request.done(function () {
			console.log("Horario agregado con exito");
		});

		request.fail(function() {
    	console.log('error al agregar horario');
  });
	}


function desactivarActivarLugar(lugar, activado) {
	var sEstado;
	if(activado){
		sEstado = "activo";
	}else{
		sEstado = "desactivo";
	}
	
	var request = $.ajax({
	url: 'services/lugar/activar_desactivar_lugar.php',
    	dataType: 'json',
    	async: false,
    	method: 'post',
    	data:{
    		'pidlugar': lugar,
    		'pestado': sEstado,
    	}

	});
	
	request.done(function() {
		console.log("activar/desactivar correctamente");
		llenarTabla();
	});
	
	request.fail(function() {
		console.log("activar/desactivar Error de conexion");
	});
}
