var btnAgregarOrganizacion = document.querySelector("#btnAgregarOrganizacion");

listarOrganizacionesEvento();
llenarDatosDeEvento();
llenarListaOrganizaciones();

if(btnAgregarOrganizacion != null){
	btnAgregarOrganizacion.addEventListener("click", agregarOrganizacion);
}

function llenarListaOrganizaciones(){
	var listaOrganizaciones = document.querySelector("#nombreOrganizacion");
	var organizaciones = obtenerOrganizaciones();
	
	for(var i = 0; i < organizaciones.length; i++) {
		var opt = organizaciones[i]["nombre"];
		var el = document.createElement("option");
		
		el.textContent = opt;
		el.value = organizaciones[i]["idOrganizacion"];
		listaOrganizaciones.appendChild(el);
	}
}

function agregarOrganizacion(){
	var idEvento = obtenerId();
	var organizacion = document.querySelector("#nombreOrganizacion");
	var idOrganizacion = organizacion.value;		
	guardarOrganizacionPorEvento(Number(idEvento), Number(idOrganizacion));
	
	event.preventDefault();
	event.stopPropagation();

}

function listarOrganizacionesEvento() {
	var listaOrganizacionesPorEvento = obtenerOrganizacionPorEvento();
	var td, texto, fila;
	var tbody = document.querySelector("#tablaOrganizacionesEvento tbody");

	tbody.innerHTML ="";
	
	if(listaOrganizacionesPorEvento != []){

		
		for (var i = 0; i < listaOrganizacionesPorEvento.length; i++) {
			
	
				
				document.querySelector("#tablaOrganizacionesEvento").style.display = "";
				fila = tbody.insertRow(i);
				td = fila.insertCell();
				texto = document.createTextNode(listaOrganizacionesPorEvento[i]["nombre"]);
				td.appendChild(texto);
		
				
				var td = fila.insertCell();
				var btnEliminar = document.createElement('button');

				btnEliminar.type = "button";
				btnEliminar.value = "Eliminar";
				btnEliminar.name =  listaOrganizacionesPorEvento[i]["idOrganizacion"];
				btnEliminar.classList="btn btnDelete fa fa-trash";
				btnEliminar.addEventListener("click", eliminarOrganizacion);

				td.appendChild(btnEliminar);
			
		}
	}
}