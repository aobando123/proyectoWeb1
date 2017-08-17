var botonAgregarInvitado = document.querySelector("#btnAgregarInvitado");
var span = document.querySelectorAll(".span-error");

if(botonAgregarInvitado!=null){
	botonAgregarInvitado.addEventListener("click", registrarDatosInvitado);
}

//Obtener Valores
function obtenerValoresInvitado(){
	var form = obtenerElementosInvitado();
	var arrFormulario = [];
	
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	
	return arrFormulario;
}
function limpiarValoresInvitado() {
	var form = obtenerElementosInvitado();
	
	
	for (var i = 0; i < form.length; i++) {
		form[i].value = '';
	}
}

//optener los elementos del form
function obtenerElementosInvitado(){
	return document.querySelectorAll('form#agregarInvitado input:not([type="submit"]), form#agregarInvitado select');
}

//Registrar Datos
function registrarDatosInvitado (){
		var arrDatos = obtenerValoresInvitado();
			event.preventDefault();
			event.stopPropagation();
		if (validarDatos(arrDatos)) {
			var idEvento = obtenerId();
			event.preventDefault();
			event.stopPropagation();
			agregarItemInvitado(Number(idEvento), arrDatos);
			limpiarValoresInvitado();

		}

			

}


function validarDatos(arrDatos) {
  var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var form = document.querySelectorAll('form#agregarInvitado input:not([type="submit"]), form#agregarInvitado select');
	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===0){
				span[i].innerHTML =" Campo requerido";
				valido = false;
			}
			else{
				if(i===1 && !(checkEmail.test(arrDatos[1])) ){
					span[i].innerHTML =" Por favor digite un email valido";
					valido = false;
				}
				else{
					span[i].innerHTML ="*";
				}

			}
		}
	}
	return valido;
}
//TABS
function openTabs(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function eliminarInvitado(){
 var invitado  = event.currentTarget.name;
 
 elimInvitado(invitado);
}

listarInvitadosEvento();
// Función para listar Invitados del Evento
function listarInvitadosEvento() {
	var listaInvitados = obtenerlistaInvitadosPorEvento();
	var td, text, fila;
	var idEvento = obtenerId();

	var tbody = document.querySelector("#tablaInvitadosEvento tbody");
	var campos = ["nombre","correo","telefono"];
	tbody.innerHTML ="";//limpia la tabla
	
	if(listaInvitados != null){
		

		
		for (var i = 0; i < listaInvitados.length; i++) {

				document.querySelector("#tablaInvitadosEvento").style.display = "";
				fila = tbody.insertRow(i);//fila

			for (var columna = 0; columna < Object.keys(listaInvitados[i]).length -1 ; columna++) {
				td = fila.insertCell();
				text = document.createTextNode(listaInvitados[i][campos[columna]]);
				td.appendChild(text);
			}
			
			/*CODIGO PARA AGREGAR BOTONES */
			var td = fila.insertCell();
			var btnEliminar = document.createElement('button');

			btnEliminar.type = "button";
			btnEliminar.value = "Eliminar";
			btnEliminar.name =  listaInvitados[i]["idinvitado_especiales"];
			btnEliminar.classList="btn btnDelete fa fa-trash";
			btnEliminar.addEventListener("click", eliminarInvitado);

			td.appendChild(btnEliminar);
			
			
		}
		
	}
}