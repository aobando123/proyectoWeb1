function obtenerAcademias() {
	var listaAcademias = [];
	var request = $.ajax({
		url:'services/evento/academia/listar_academias_para_seleccion.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':obtenerId(),
		}
	});

	request.done(function (datos) {
		listaAcademias =  datos;
	});
	request.fail(function () {
		console.log("fallo");
	});
	return listaAcademias;
}

function obtenerlistaAcademias() {
var listaAcademias = [];
	var request = $.ajax({
		url:'services/evento/academia/listar_academias_de_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':obtenerId(),
		}
	});

	request.done(function (datos) {
		listaAcademias =  datos;
	});
	request.fail(function () {
		console.log("fallo");
	});
	return listaAcademias;
}

function obtenerEstudiantesPorEvento(){
	var listaEstudiantePorEvento = JSON.parse(localStorage.getItem('listaEstudiantePorEvento'));

	if(listaEstudiantePorEvento == null){
		listaEstudiantePorEvento = [];
	}
	  
	return listaEstudiantePorEvento;
}

function agregarItemAcademia(idEvento, idAcademia) {
	var request = $.ajax({
		url:'services/evento/academia/agregar_academia_a_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':idEvento,
			'pAcademia': idAcademia
		}	
	});

	request.done(function () {
		listarAcademiasEvento();
		event.preventDefault();
		event.stopPropagation();
		llamarAlerta("success","Academia agregada existosamente","");
		event.preventDefault();
		event.stopPropagation();
		llenarListaAcademias();

	});
	request.fail(function(){
		console.log("fallo");
	})
	
}


function elimAcademia(academia, evento) {
	var request = $.ajax({
		url:'services/evento/academia/eliminar_academia_de_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':evento,
			'pAcademia': academia
		}
	});
	request.done(function (){
		llenarListaAcademias();
		listarAcademiasEvento();
		event.preventDefault();
		event.stopPropagation();
		llamarAlerta("error","Academia borrada existosamente","");
		event.preventDefault();
		event.stopPropagation();
	});
	request.fail(function () {
		console.log("error");
	});
}