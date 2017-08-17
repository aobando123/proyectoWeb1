// JavaScript Document
var botonAgregarReserva = document.querySelector("#btnAgregarReserva");
listarEvento();
var entradasDisponible;
if(botonAgregarReserva!=null){
	botonAgregarReserva.addEventListener("click", registrarDatosReserva);
}
//id de evento
function obtenerId(){
	var url = new URL(window.location.href);
	return url.searchParams.get("id");
}

//Obtener Valores
function obtenerValoresReserva(){
	var form = obtenerElementosReserva();
	var arrFormulario = [];
	
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	
	return arrFormulario;
}


function validarDatos(arrDatos) {
	var form = document.querySelectorAll('form#agregarReserva input:not([type="button"]), form#agregarReserva select ');
	var span = document.querySelectorAll(".span-error");

	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]=="requerido") {
			if(arrDatos[i]==0){
				span[i].innerHTML =" Campo requerido";
				valido = false;
			}
		}
	}
	return valido;
}


//optener los elementos del form
function obtenerElementosReserva(){
	return document.querySelectorAll('form#agregarReserva input:not([type="button"]), form#agregarReserva select');
}

//Registrar Datos
function registrarDatosReserva (){
	var idEvento = obtenerId();
	var arrDatos = obtenerValoresReserva();

	var fechaFinal = "";
	var fechaActual = new Date();
	var formatDate = fechaActual.toISOString().substring(0, 10);
	

		
		
	
	if(entradasDisponible-arrDatos[3] < 0){
		llamarAlerta("error",
		"Lo sentimos",
		"La cantidad de entradas que desea reservar no está disponible");
		}else{
				//agrega
					if(validarDatos(arrDatos) == true){
					registrarReserva(Number(idEvento), arrDatos);
					
					restarReserva(Number(idEvento),arrDatos[3]);
					limpiarFormulario();
					
					event.preventDefault();
					event.stopPropagation();
					}
				}
					
}


function limpiarFormulario(){
	//Editable
	document.querySelector("#nombrePersona").value = "";//cuando se traten de select poner 1
	document.querySelector("#correoPersona").value = "";
	document.querySelector("#telefonoPersona").value = "";
	document.querySelector("#cantidadEntradas").value = "";

}	

function listarEvento() {
	
	document.getElementById("contenedorDatosEvento").innerHTML="";
	var idEvento = obtenerId();
	
	var listaEventos = obtenerEvento(idEvento);
	
	if(listaEventos.length > 0 ){
		for (var i = 0; i < listaEventos.length; i++) {
	
		
		var contenedor = document.getElementById("contenedorDatosEvento");
		var nombre = document.createElement("h2");
		var fechaInicio = document.createElement("h2");
		var fechaFinal = document.createElement("h2");
		var tipo = document.createElement("h2");
		var costoInscripcion = document.createElement("h2");
		var costoEntrada = document.createElement("h2");
		var entradasDisponibles = document.createElement("h2");
		var lugar = document.createElement("h2");
		
		nombre.className = "tituloDetalleEvento";
		fechaInicio.className = "tituloDetalleEvento";
		fechaFinal.className = "tituloDetalleEvento";
		tipo.className = "tituloDetalleEvento";
		costoInscripcion.className = "tituloDetalleEvento";
		costoEntrada.className = "tituloDetalleEvento";
		entradasDisponibles.className = "tituloDetalleEvento";
		lugar.className = "tituloDetalleEvento";
		
		var pTextoNombre = document.createElement("p");
		var pTextoFechaInicio = document.createElement("p");
		var pTextoFechaFinal = document.createElement("p");
		var pTextoTipo = document.createElement("p");
		var pTextoCostoInscripcion = document.createElement("p");
		var pTextoCostoEntrada = document.createElement("p");
		var pTextoEntradasDisponibles = document.createElement("p");
		var pTextoLugar = document.createElement("p");
		var br = document.createElement("br");

		pTextoEntradasDisponibles.id="entradas";

		nombre.appendChild(document.createTextNode('Nombre de evento'));
		contenedor.appendChild(nombre);
		pTextoNombre.appendChild(document.createTextNode(listaEventos[i]["nombre"]));
		contenedor.appendChild(pTextoNombre);
		
		fechaInicio.appendChild(document.createTextNode('Fecha de inicio'));
		contenedor.appendChild(fechaInicio);
		pTextoFechaInicio.appendChild(document.createTextNode(listaEventos[i]["fechaInicial"]));
		contenedor.appendChild(pTextoFechaInicio);
		
		fechaFinal.appendChild(document.createTextNode('Fecha de cierre'));
		contenedor.appendChild(fechaFinal);
		pTextoFechaFinal.appendChild(document.createTextNode(listaEventos[i]["fechaFinal"]));
		contenedor.appendChild(pTextoFechaFinal);
		
		tipo.appendChild(document.createTextNode('Tipo de evento'));
		contenedor.appendChild(tipo);
		pTextoTipo.appendChild(document.createTextNode(listaEventos[i]["tipo"]));
		contenedor.appendChild(pTextoTipo);
		
		lugar.appendChild(document.createTextNode('Lugar'));
		contenedor.appendChild(lugar);
		pTextoLugar.appendChild(document.createTextNode(listaEventos[i]["nombreLugar"]));
		contenedor.appendChild(pTextoLugar);
		
		costoEntrada.appendChild(document.createTextNode('Costo de entrada'));
		contenedor.appendChild(costoEntrada);
		pTextoCostoEntrada.appendChild(document.createTextNode(listaEventos[i]["costoEntrada"]));
		contenedor.appendChild(pTextoCostoEntrada);
		
		entradasDisponibles.appendChild(document.createTextNode('Entradas disponibles'));
		contenedor.appendChild(entradasDisponibles);
		pTextoEntradasDisponibles.appendChild(document.createTextNode(listaEventos[i]["cantidadEntradas"]));
		contenedor.appendChild(pTextoEntradasDisponibles);
		
		entradasDisponible = listaEventos[i]["cantidadEntradas"]; 
	
}
}
}

