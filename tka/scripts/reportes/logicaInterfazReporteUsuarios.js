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
	
	if(idDiv === "usuariosActivos" || idDiv === "usuariosInactivos"){
		obtenerDatosUsuarios(idTabla, idReporte);
		obtenerDatosProfesores(idTabla, idReporte);
		obtenerDatosEstudiantes(idTabla, idReporte);
	}
	
	if(idDiv === "eventos"){
		activos = true;
		obtenerDatosEventos(idTabla, idReporte);
	}
}

obtenerDatosUsuarios("tablaUsuariosActivos", "reporteUsuariosActivos");
obtenerDatosProfesores("tablaUsuariosActivos", "reporteUsuariosActivos");
obtenerDatosEstudiantes("tablaUsuariosActivos", "reporteUsuariosActivos");


function obtenerDatosUsuarios(idTabla, idReporte){
	var listaUsuarios = obtenerListaUsuarios();
	var tbody = document.querySelector("#"+idTabla+ " tbody");
	
	tbody.innerHTML ="";
	
	if(listaUsuarios != []){
		
		for (var i = 0; i < listaUsuarios.length; i++) {
			
			if(listaUsuarios[i][listaUsuarios[i].length-1] === activos){
				document.querySelector("#"+idReporte).style.display = "";	
				fila = tbody.insertRow(numRow);
				numRow++;
				
				var nombreUsuario = listaUsuarios[i][2];
				var rolUsuario = listaUsuarios[i][5];
				var correoUsuario = listaUsuarios[i][3];
				
				agregarCeldas(numRow, nombreUsuario, rolUsuario, correoUsuario, idTabla);
			}
		}
	}
	
	if(numRow == 0){
		if(activos)
			document.getElementById("msg_noUsuariosActivos").style.display = "";
		else
			document.getElementById("msg_noUsuariosInactivos").style.display = "";
	}
	else{
		document.getElementById("msg_noUsuariosActivos").style.display = "none";
		document.getElementById("msg_noUsuariosInactivos").style.display = "none";
	}
}

function obtenerDatosProfesores(idTabla, idReporte){
	var listaProfesores = obtenerListaProfesores();
	var tbody = document.querySelector("#"+idTabla+ " tbody");
	
	if(listaProfesores != []){
		
		for (var i = 0; i < listaProfesores.length; i++) {
			
			if(listaProfesores[i][listaProfesores[i].length-1] === activos){
				document.querySelector("#"+idReporte).style.display = "";	
				fila = tbody.insertRow(numRow);
				numRow++;
				
				var nombreUsuario = listaProfesores[i][1] +" "+ listaProfesores[i][2] +" "+ listaProfesores[i][3];
				var rolUsuario = "Profesores";
				var correoUsuario = listaProfesores[i][5];
				
				agregarCeldas(numRow, nombreUsuario, rolUsuario, correoUsuario, idTabla);
			}
		}
	}
	
}

function obtenerDatosEstudiantes(idTabla, idReporte){
	var listaProfesores = obtenerListaEstudiantes();
	var tbody = document.querySelector("#"+idTabla+" tbody");
	
	if(listaProfesores != []){
		
		for (var i = 0; i < listaProfesores.length; i++) {
			
			if(listaProfesores[i][listaProfesores[i].length-1] === activos){
				document.querySelector("#"+idReporte).style.display = "";	
				fila = tbody.insertRow(numRow);
				numRow++;
				
				var nombreUsuario = listaProfesores[i][1] +" "+ listaProfesores[i][2] +" "+ listaProfesores[i][3];
				var rolUsuario = "Estudiante";
				var correoUsuario = listaProfesores[i][10];
				
				agregarCeldas(numRow, nombreUsuario, rolUsuario, correoUsuario, idTabla);
			}
		}
	}
}

function obtenerDatosEventos(idTabla, idReporte){
	var listaEventos = obtenerListaEventos();
	var tbody = document.querySelector("#"+idTabla+" tbody");

	tbody.innerHTML ="";

	if(listaEventos != []){
		
		for (var i = 0; i < listaEventos.length; i++) {
			
			if(listaEventos[i][listaEventos[i].length-1] === activos){
				document.querySelector("#"+idReporte).style.display = "";	
				fila = tbody.insertRow(numRow);
				numRow++;
				
				var nombre = listaEventos[i][1];
				var tipo = listaEventos[i][4];
				var costo = listaEventos[i][6];
				var lugar = listaEventos[i][8];
				
				agregarCeldasEvento(numRow, nombre, tipo, costo, lugar, idTabla);
			}
		}
	}
	
	if(numRow == 0)
		document.getElementById("msg_noEventos").style.display = "";
	else
		document.getElementById("msg_noEventos").style.display = "none";
}

function agregarCeldas(numRow, nombreUsuario, rolUsuario, correoUsuario, idTabla) {
	var td, texto, fila;
	var tbody = document.querySelector("#"+idTabla+ " tbody");

	fila = tbody.insertRow(numRow);
	
	//Añade el nombre del usuario
	td = fila.insertCell(0);
	texto = document.createTextNode(nombreUsuario);
	td.appendChild(texto);
	
	//Añade el rol del usuario
	td = fila.insertCell(1);
	texto = document.createTextNode(rolUsuario);
	td.appendChild(texto);
	
	//Añade el correo del usuario
	td = fila.insertCell(2);
	texto = document.createTextNode(correoUsuario);
	td.appendChild(texto);
}

function agregarCeldasEvento(numRow, nombre, tipo, costo, lugar, idTabla) {
	var td, texto, fila;
	var tbody = document.querySelector("#"+idTabla+ " tbody");

	fila = tbody.insertRow(numRow);
	
	//Añade el nombre del evento
	td = fila.insertCell(0);
	texto = document.createTextNode(nombre);
	td.appendChild(texto);
		
	//Añade el tipo del evento
	td = fila.insertCell(1);
	texto = document.createTextNode(tipo);
	td.appendChild(texto);
	
	//Añade el costo del evento
	td = fila.insertCell(2);
	texto = document.createTextNode(costo);
	td.appendChild(texto);
	
	//Añade el lugar del evento
	td = fila.insertCell(3);
	texto = document.createTextNode(lugar);
	td.appendChild(texto);
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
}