function obtenerListaUsuarios() {
	var listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

	if(listaUsuarios == null){
		listaUsuarios = [];
	}

	return listaUsuarios;
}

function obtenerListaProfesores() {
	var listaProfesores = JSON.parse(localStorage.getItem('listaProfesoresLS'));

	if(listaProfesores == null){
		listaProfesores = [];
	}

	return listaProfesores;
}

function obtenerListaEstudiantes() {
	var listaEstudiantes = JSON.parse(localStorage.getItem('listaestudiantesLS'));

	if(listaEstudiantes == null){
		listaEstudiantes = [];
	}

	return listaEstudiantes;
}

function obtenerListaEventos() {
	var listaEventos = JSON.parse(localStorage.getItem('listaEventos'));

	if(listaEventos == null){
		listaEventos = [];
	}

	return listaEventos;
}