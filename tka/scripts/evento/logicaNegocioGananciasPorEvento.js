function obtenerlistaGananciasPorEvento() {
	var listaGanancias = JSON.parse(localStorage.getItem('listaTotalGananciasPorEvento'));

	if(listaGanancias == null){
		listaGanancias = [];
	}
	  
	return listaGanancias;
}
