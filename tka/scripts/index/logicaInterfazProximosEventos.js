// JavaScript Document
listarEventos();
function listarEventos() {
	
	var listaEventos = obtenerlistaEventos();
	
	if(listaEventos.length > 0 ){
		for (var i = 0; i < listaEventos.length; i++) {
			
		var ul = document.getElementById("listaEventos");
		var li = document.createElement("li");
		var div = document.createElement("div");
		var h6 = document.createElement("h6");
		var pFechaInicial = document.createElement("p");
		var pFechaFinal = document.createElement("p");
		var plugar = document.createElement("p");
		var pPrecio = document.createElement("p");

		var pLink = document.createElement("p");
		var a = document.createElement("a");
		li.className = "one_quarter";
		div.className = "borderedbox pad15";
		h6.className = "push10";

		pLink.className = "nospace";
		a.setAttribute("href", "reservarEntradas.html?id="+listaEventos[i]["idEvento"]);
		a.setAttribute("target", "_blank");
		
		h6.appendChild(document.createTextNode(listaEventos[i]["nombre"]));
		div.appendChild(h6);
		pFechaInicial.appendChild(document.createTextNode("Fecha de inicio: "+listaEventos[i]["fechaInicial"]));
		pFechaFinal.appendChild(document.createTextNode("Fecha de finalizacion: "+listaEventos[i]["fechaFinal"]))
		plugar.appendChild(document.createTextNode("Lugar: "+listaEventos[i]["nombreLugar"]));
		pPrecio.appendChild(document.createTextNode("Costo de entrada: "+listaEventos[i]["costoEntrada"]));

		div.appendChild(pFechaInicial);
		div.appendChild(pFechaFinal);
		div.appendChild(plugar);
		div.appendChild(pPrecio);
		a.appendChild(document.createTextNode('Reservar Entradas'));
		pLink.appendChild(a);
		div.appendChild(pLink);
		li.appendChild(div);
		ul.appendChild(li);
			
		}
	
}else{
	llamarAlerta(
					"error",
					"¡Lo Sentimos!",
					"No hay futuros eventos disponibles por el momento"
				);

			}
	}