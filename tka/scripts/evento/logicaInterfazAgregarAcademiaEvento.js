document.querySelector("#tablaAcademiasEvento").style.display = "";
var botonAgregarAcademia = document.querySelector("#btnAgregarAcademia");
llenarListaAcademias();
listarAcademiasEvento();

if(botonAgregarAcademia!=null){
	botonAgregarAcademia.addEventListener("click", registrarDatosAcademia);
}

//lista de Academias en Select
function llenarListaAcademias(){
	var listaAcademias = document.querySelector("#nombreAcademia");
	var academias = obtenerAcademias();
	listaAcademias.innerHTML = '';
	for(var i = 0; i < academias.length; i++) {
		var el = document.createElement("option");
		
		el.textContent = academias[i]["nombreAcademia"];
		el.value = academias[i]["idAcademia"];
		el.id = academias[i]["idAcademia"];
		listaAcademias.appendChild(el);
	}
}

//Obtener Valores
function obtenerValoresAcademia(){
	var form = obtenerElementosAcademia();
	var arrFormulario = [];
	
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	
	return arrFormulario;
}

//optener los elementos del form
function obtenerElementosAcademia(){
	return document.querySelectorAll('form#agregarAcademia input:not([type="submit"]), form#agregarAcademia select');
}

//Registrar Datos
function registrarDatosAcademia(){
	
	var idEvento = obtenerId();
	var idAcademia = document.querySelector("#nombreAcademia").value;
	agregarItemAcademia(Number(idEvento), Number(idAcademia));
			
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

function eliminarAcademia(){
 var academia  = event.currentTarget.name;
 var evento = obtenerId();
 elimAcademia(academia,evento);

}

function eliminarEstudiantes(idAcademia){
	 var estudiantes = obtenerEstudiantesPorEvento();
	 var editado = [];

	for (var i = 0; i < estudiantes.length; i++) {	
		if(estudiantes[i][3] != idAcademia){
		editado.push(estudiantes[i]);
		}		
	}
	
	localStorage.setItem('listaEstudiantePorEvento', JSON.stringify(editado))
}

// Función para listar Academias del Evento
function listarAcademiasEvento() {
	var listaAcademiasPorEvento = obtenerlistaAcademias();
	var td, text, fila;
	var idEvento = obtenerId();

	var tbody = document.querySelector("#tablaAcademiasEvento tbody");

	tbody.innerHTML ="";//limpia la tabla
	
	if(listaAcademiasPorEvento != ""){
		for (var i = 0; i < listaAcademiasPorEvento.length; i++) {
			
			fila = tbody.insertRow(i);//fila		
				
				
				td = fila.insertCell();
				text = document.createTextNode(listaAcademiasPorEvento[i]["nombreAcademia"]);
				td.appendChild(text);
			
			
			
			/*CODIGO PARA AGREGAR BOTONES */
			var td = fila.insertCell();
			var btnEliminar = document.createElement('button');

			btnEliminar.type = "button";
			btnEliminar.value = "Eliminar";
			btnEliminar.name =  listaAcademiasPorEvento[i]["idAcademia"];
			btnEliminar.classList="btn btnDelete fa fa-trash";
			btnEliminar.addEventListener("click", eliminarAcademia);

			td.appendChild(btnEliminar);
			
		}
	}
}