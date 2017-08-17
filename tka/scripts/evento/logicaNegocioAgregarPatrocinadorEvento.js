function obtenerPatrocinadores(){
	var listaPatrocinadores = JSON.parse(localStorage.getItem('listaPatrocinadoresLS'));

	if(listaPatrocinadores == null){
		listaPatrocinadores = [];
	}
	  
	return listaPatrocinadores;
}
	
function obtenerPatrocinadorPorEvento(){
	var listaPatrocinadorPorEvento = JSON.parse(localStorage.getItem('listaPatrocinadorPorEvento'));

	if(listaPatrocinadorPorEvento == null){
		listaPatrocinadorPorEvento = [];
	}
	  
	return listaPatrocinadorPorEvento;
}


function obtenerlistaCategorias() {
	var listaCategorias = JSON.parse(localStorage.getItem('listaCategorias'));

	if(listaCategorias == null){
		listaCategorias = [];
	}
	  
	return listaCategorias;
}

function guardarPatrocinadorPorEvento(idEvento, idPatrocinador, idNombrePatrocinador){
	var listaNueva = [idEvento];
	listaNueva.push(idPatrocinador);
	listaNueva.push(idNombrePatrocinador);
	
	var valido = true;
	
	var patrocinadoresPorEvento = obtenerPatrocinadorPorEvento();
	
	for (var i = 0; i < patrocinadoresPorEvento.length; i++) {
		
		if(patrocinadoresPorEvento[i][0] === idEvento && patrocinadoresPorEvento[i][1] === idPatrocinador){
			valido = false;
			continue;
		}
	}
	
	if(valido){
		patrocinadoresPorEvento.push(listaNueva);
		localStorage.setItem('listaPatrocinadorPorEvento', JSON.stringify(patrocinadoresPorEvento));
		
		llamarAlerta(
			"success",
			"Patrocinador agregado",
			"Los datos han sido agregados satisfactoriamente"
		);
	}
	else{
		llamarAlerta(
			"error",
			"¡Lo Sentimos!",
			"Esta patrocinador ya existe en el evento"
		);
	}
}

function eliminarPatrocinador(){
	var categoria = Number(event.currentTarget.name);
 
	var listaCategorias = obtenerPatrocinadorPorEvento();

    var editado = [];
	for (var i = 0; i < listaCategorias.length; i++) {	
		if(listaCategorias[i][1] != categoria){
			editado.push(listaCategorias[i]);
		}		
	}
	
	localStorage.setItem('listaPatrocinadorPorEvento', JSON.stringify(editado));
	listarPatrocinadoresEvento();
}