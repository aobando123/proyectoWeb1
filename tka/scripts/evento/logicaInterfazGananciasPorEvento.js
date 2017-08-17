// JavaScript Document
listarGananciasDeEvento();
function listarGananciasDeEvento() {
	
	var listaGanancias = obtenerlistaGananciasPorEvento();
	var idEvento = obtenerId();
	
	var existe = false;
	for(var i = 0; i < listaGanancias.length; i++){
		if(listaGanancias[i][0] == idEvento){
			existe = true;
			var dinero = listaGanancias[i][1];
			}
		}
		
	if(existe == true){
		var h2 = document.getElementById("gananciasPorEvento");
		h2.appendChild(document.createTextNode("Ganancias de evento "+ dinero));		
		}else{
			var h2 = document.getElementById("gananciasPorEvento");
			h2.appendChild(document.createTextNode("Este evento aún no tiene ganancias"));	
			}
	
}