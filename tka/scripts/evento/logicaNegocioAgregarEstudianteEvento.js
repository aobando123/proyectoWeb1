function obtenerEstudiantes() {
	var listaEstudiantes = [];
	var request = $.ajax({
		url:'services/evento/estudiante/listar_estudiante.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':obtenerId(),
		}
	});
	request.done(function (datos) {
		listaEstudiantes = datos
	});
	request.fail(function () {
		console.log("Ha fallado");
	})
	return listaEstudiantes;
}
function obtenerEstudiantesPorCategorias(){
	var idEvento = obtenerId();
	var academias = obtenerAcademiasPorEvento();
	var academiasDeEvento = [];
	var estudiantes = obtenerEstudiantes();
	var estudiantesPorEvento = [];
	
	if(academias !== []){
		for(var i = 0; i < academias.length; i++){
			if(academias[i][0] == idEvento){
				academiasDeEvento.push(academias[i]);
			}
		}
	}
	
	if(estudiantes !== [] && academiasDeEvento !== []){
		for(j = 0; j < estudiantes.length; j++){
			var idAcademia = estudiantes[j][7][0];
			
			for(var i = 0; i < academiasDeEvento.length; i++){
				if(academiasDeEvento[i][1] == idAcademia){
					estudiantesPorEvento.push(estudiantes[j]);
				}
			}
		}
	}
	
	return estudiantesPorEvento;
}

function obtenerEstudiantesPorEvento(){
	var listaEstudiantePorEvento = [];
	var request = $.ajax ({
		url:'services/evento/estudiante/listar_estudiantes_seleccionados.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':obtenerId(),
		}
		});
	request.done(function (datos) {
		listaEstudiantePorEvento = datos
	});
	request.fail(function () {
		console.log("Ha fallado");
	})
	  
	return listaEstudiantePorEvento;
}

function guardarEstudiantesPorEvento(idEventoCategoria,idEstudiante){
	var request = $.ajax({
		url:'services/evento/estudiante/buscar_estudiante_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEventoCategoria':idEventoCategoria,
			'pEstudiante': idEstudiante
		}	
	});

	request.done(function (datos) {
		if (datos === "Ya existe ese estudiante") {
			llamarAlerta("error","Ya existe ese estudiante","");
		}
		else{
			var insertar = $.ajax({
				url:'services/evento/estudiante/agregarEstudiante_a_evento.php',
				dataType:'json',
				async:false,
				method:'Post',
				data:{
			'pEventoCategoria':idEventoCategoria,
			'pEstudiante': idEstudiante
		
				}
			});
			insertar.done(function () {

				llamarAlerta("success","Estudiante agregado",
					"se ha agregado el estudiante exitosamente");
				event.preventDefault();
				event.stopPropagation();
				listarEstudiantesEvento();
				

			});
		}
	});

	request.fail(function(){
		console.log("fallo");
	})
}

function elimEstudiantedeEvento(evento, estudiante) {
	var request = $.ajax({
		url:'services/evento/estudiante/eliminar_estudiante_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':evento,
			'pEstudiante':estudiante
		}});
	request.done(function () {
		llamarAlerta("warning","Se ha eliminado estudiante del evento","");
		listarEstudiantesEvento();
	});
	request.fail(function () {
		console.log("Ha fallado");
	})
	  
}

function ingresarRepesaje(peso, calificado, estudiante, categoriaEvento) {
	var request = $.ajax({
		url:'services/evento/estudiante/ingresar_repesaje.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEventoCategoria':categoriaEvento,
			'pEstudiante':estudiante,
			'pCalificado':calificado,
			'pPeso':peso
		}});
	request.done(function () {
		llamarAlerta("success","El repesaje ha sido registrado","");
		listarEstudiantesEvento();
	});
	request.fail(function () {
		console.log("Ha fallado");
	})
}