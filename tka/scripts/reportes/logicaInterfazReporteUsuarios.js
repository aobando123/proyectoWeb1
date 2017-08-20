var botonesReportes = document.getElementsByClassName("btnGenerarReporte");
for(var i = 0; i <= botonesReportes.length-1; i++){
	botonesReportes[i].addEventListener("click", imprimirReporte);
}

var numRow = 0;
var btnActivo = document.querySelector(".btnActivo");
var activos = btnActivo.classList.value.indexOf("active") != 0;

function mostrarDatosReporte(event, idDiv, idTabla, idReporte){
	numRow = 0;
	activos = idDiv === "usuariosActivos" ? true : false;
	abrirTabs(event, idDiv);
}

obtenerDatosProfesores("tablaProfesoresInactivos", "reporteProfesoresInactivos", "false");
obtenerDatosProfesores("tablaProfesoresActivos", "reporteProfesoresActivos", "true");
validarMsjs();

function obtenerDatosProfesores(idTabla, idReporte, estado){
	var activo = estado == "true" ? "activo" : "inactivo";
	numRow = 0;
	var listaProfesores = obtenerListaUsuarios();
	var tbody = document.querySelector("#"+idTabla+ " tbody");
	
	if(listaProfesores != []){
		
		for (var i = 0; i < listaProfesores.length; i++) {
			if(listaProfesores[i]["estado"].toLowerCase() == estado || listaProfesores[i]["estado"].toLowerCase() == activo){
				document.getElementById(idReporte).style.display = "block";
				fila = tbody.insertRow(numRow);
				numRow++;
				
				var array = [];			
				array.push(listaProfesores[i]["tipo"]);
				array.push(listaProfesores[i]["correo"]);
				array.push(listaProfesores[i]["nombre"] +" "+ listaProfesores[i]["primer_apellido"] +" "+ listaProfesores[i]["segundo_apellido"]);
							
				agregarCelda(numRow, array, idTabla);
			}
		}
	}
}

function agregarCelda(numRow, array, idTabla){
	var td, texto, fila;
	var tbody = document.querySelector("#"+idTabla+ " tbody");
	fila = tbody.insertRow(numRow);
	
	for (var i = 0; i < array.length; i++) {
		td = fila.insertCell(0);
		texto = document.createTextNode(array[i]);
		td.appendChild(texto);
	}
}


function validarMsjs(){
	var btnActivo = document.querySelector(".btnActivo");

	if(btnActivo.id == "profInactivos"){
		if(document.getElementById("reporteProfesoresInactivos").style.display == "block")
			document.getElementById("msg_noProfesoresInactivos").style.display = "none";
		
		else
			document.getElementById("msg_noProfesoresInactivos").style.display = "";
	}

	if(btnActivo.id == "profActivos"){
		if(document.getElementById("reporteProfesoresActivos").style.display == "block")
			document.getElementById("msg_noProfesoresActivos").style.display = "none";
		
		else
			document.getElementById("msg_noProfesoresActivos").style.display = "";
	}
}

function imprimirReporte(){
	document.querySelector("#topbarsesion").style.display = "none";
	document.querySelector("#mainav").style.display = "none";
	document.querySelector("#tabs").style.display = "none";
	document.querySelector(".btnGenerarReporte").style.display = "none";
    window.print();
	document.querySelector("#topbarsesion").style.display = "";
	document.querySelector("#mainav").style.display = "";
	document.querySelector("#tabs").style.display = "";
	document.querySelector(".btnGenerarReporte").style.display = "";
}

function abrirTabs(evt, id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    
	for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    
	for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        tablinks[i].className = tablinks[i].className.replace(" btnActivo", "");
        tablinks[i].style.display = "";
    }
    
	document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active btnActivo";

    validarMsjs();
}