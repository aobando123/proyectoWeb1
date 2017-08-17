function obtenerlistaCategoriasPorEvento() {
	var listaCategorias;
	var request = $.ajax({
		url:'services/evento/listar_categorias_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':obtenerId(),
		}
	});
	request.done(function (datos) {
		listaCategorias = datos
	});
	request.fail(function () {
		console.log("Ha fallado");
	})
	return listaCategorias;
}

function agregarItemCategoria(pidEvento, pCategoria) {
	
	var request = $.ajax({
		url:'services/evento/buscar_categoria.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':pidEvento,
			'pPeso': pCategoria[0],
			'pEdad': pCategoria[1],
			'pGenero': pCategoria[2],
		}

	});
	request.done(function (datos) {
		if (datos === "Ya existe esa categoria") {
			llamarAlerta("error","Ya existe esta Categoria","");
		}
		else{
			var insertar = $.ajax({
				url:'services/evento/agregar_categoria_a_evento.php',
				dataType:'json',
				async:false,
				method:'Post',
				data:{
					'pEvento':pidEvento,
					'pPeso': pCategoria[0],
					'pEdad': pCategoria[1],
					'pGenero': pCategoria[2],
				}
			});
			insertar.done(function (datos) {

				llamarAlerta("success","Categoria agregada",
					"se ha agregado la categoria exitosamente");
				event.preventDefault();
				event.stopPropagation();
				listarCategoriasEvento();

			});
		}
	});

	request.fail(function () {
		console.log("error");
	});
					event.preventDefault();
				event.stopPropagation();
}
function elimCategoria(idCategoriaEvento) {
	var request = $.ajax({
		url:'services/evento/eliminar_categoria_evento.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pcategoriaEvento':idCategoriaEvento,
		}
	});
	request.done(function (){
		listarCategoriasEvento();
		llamarAlerta("warning","Categoria eliminada","una categoria ha sido eliminada del evento");
	});
	request.fail(function () {
		console.log("error");
	});
}