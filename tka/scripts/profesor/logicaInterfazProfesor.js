/*Botones*/
var botonAgregar = document.querySelector("#btnAgregar");
var botonRegistrar = document.querySelector("#btnRegistrar");
var botonActualizar = document.querySelector("#btnActualizar");
var titulo = document.querySelector("#titulo");
var modal = document.querySelector(".remodal-overlay");

/*Eventos de los botones*/
botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);
botonAgregar.addEventListener("click", llamarModal);

var table = document.querySelector("#tblProfesores").tBodies[0];

if(table != null){
	var busqueda = document.querySelector('#buscar');
	busqueda.addEventListener('keyup', buscaTabla);
}


llenarTabla();
llenarListaAcademias();

function buscaTabla(){
  texto = busqueda.value.toLowerCase();
  var r=0;
  while(row = table.rows[r++])
  {
	if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
	  row.style.display = null;
	else
	  row.style.display = 'none';
  }
}

function llamarModal() {
	cambiarBotones("registrar", this.name);
	eliminarMsjRequerido();
	document.querySelector("#numId").disabled = false;  
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar profesor"
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}

function obtenerCampos() {
	return document.querySelectorAll('form input:not([type="button"]), form select ');
}

function obtenerDatos() {
	var campos = obtenerCampos();
	var arrFormulario = [];
	
	for (var i = 0; i < campos.length; i++) {
		if(campos[i].id === "txtAcademia")
			arrFormulario[i] = campos[i][campos[i].selectedIndex].id
		else
			arrFormulario[i] = campos[i].value;
	}
	
	return arrFormulario;
}

function validarDatos(arrDatos) {
	var form = obtenerCampos();
	var span = document.querySelectorAll(".span-error");
	var valido = true;

	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			
			if(arrDatos[i] === ""){
				span[i].innerHTML ="* Requerido";
				valido = false;
			}
		}
	}
	return valido;
}

function eliminarMsjRequerido() {
	var form = obtenerCampos();
	var span = document.querySelectorAll(".span-error");
	
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
				span[i].innerHTML ="*";
		}
	}	
}

/*Función encargada de validar que no existan profesores con email duplicados */
function validarEmail () {
	var spanEmail = document.querySelector(".span-error3");

	var email = document.querySelector('#emCorreoElect').value;
	var listaCorreos = obtenerCorreos();
	var valido = true;

	for (var j = 0; j < listaCorreos.length; j++) {
		if (String(listaCorreos[j]["correo"]) === String(email)){
			valido = false;
			spanEmail.innerHTML = "* Ya registrado.";
		}
	}
	
	return valido;
}

function registrarDatos () {
	var arrDatos = obtenerDatos();

	var edad = calcularEdad();

	if(validarEmail() && validarDatos(arrDatos)) {
		arrDatos.push(edad);
		document.querySelector(".remodal-overlay").style.display = "none";
		agregarUsuario(arrDatos);
		window.location.hash =' ';
		limpiarFormulario();
		llamarAlerta("success",
			"Profesor registrado",
			"Los datos han sido registrados satisfactoriamente"
		);
	}
}

/* Función para calcular la edad*/
function calcularEdad() {
    var hoy = new Date();
    var fechaNacimiento = new Date(document.getElementById('datFechaNacimiento').value);
    var age = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var m = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        age--;
    }
    return age;
}

function actualizarDatos(){
	var arrDatos = obtenerDatos();	
	arrDatos.push(this.name);
	arrDatos.push(calcularEdad());
	
	modificarUsuario(arrDatos);
	limpiarFormulario();
	cambiarBotones("agregar", this.name);
	
	window.location.hash='';
	
	llamarAlerta("success",
		"Información del organización actualizada",
		"Los datos han sido actualizados satisfactoriamente"
	);
}

function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo = "activado";
	
	desactivarActivarProfesor(this, activo);
	
	if(activo)
		mensajeActivo = "activado";
	
	else
		mensajeActivo = "desactivado";
	
	llamarAlerta("warning",
		"Profesor " + mensajeActivo,
		"Los datos han sido " + mensajeActivo +  "s satisfactoriamente."
	);
}

function llenarFormulario() {
	cambiarBotones("actualizar", this.name);
	eliminarMsjRequerido();
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar profesor"

	var infoProfesor = obtenerProfesorPorId(this.name);
	var infoAcademia = obtenerAcademiasPorProfesor(this.getAttribute("data-idProfesor"));

	var fecha = new Date(infoProfesor[0]["fechaNacimiento"]);
	var dia = ("0" + fecha.getDate()).slice(-2);
	var mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
	var fechaNacimiento = fecha.getFullYear() + "-" + mes +"-"+ dia;

	document.querySelector("#txtNombreProf").value = infoProfesor[0]["nombre"];
	document.querySelector("#txt1Apellido").value = infoProfesor[0]["primer_apellido"];
	document.querySelector("#txt2Apellido").value = infoProfesor[0]["segundo_apellido"];
	document.querySelector("#numId").value = infoProfesor[0]["identificacion"];
	document.querySelector("#emCorreoElect").value = infoProfesor[0]["correo"];
	document.querySelector("#txtTelefono").value = infoProfesor[0]["telefono"];
	document.querySelector("#txtGenero").value = infoProfesor[0]["genero"];
	document.querySelector("#txtAcademia").value = infoAcademia[0]["nombre"];
	document.getElementById("datFechaNacimiento").value = fechaNacimiento;
	document.querySelector("#numId").disabled = true;  
	document.querySelector("#idProfesor").value = infoProfesor[0]["idProfesor"];
}

function cambiarBotones(btn, id) {
	if(btn === "actualizar"){
		botonActualizar.className = botonActualizar.className.replace("display-none", "display-block");
		botonActualizar.name = id;//guardar el id
		botonRegistrar.className = botonRegistrar.className.replace("display-block", "display-none");
	}
	else {
		botonActualizar.className = botonActualizar.className.replace("display-block", "display-none");
		botonRegistrar.className = botonRegistrar.className.replace("display-none", "display-block");
	}
}

function limpiarFormulario(){

	document.querySelector("#txtNombreProf").value = "";
	document.querySelector("#txt1Apellido").value = "";
	document.querySelector("#txt2Apellido").value = "";
	document.querySelector("#numId").value = "";
	document.querySelector("#emCorreoElect").value = "";
	document.querySelector("#txtGenero").value = "";
	document.querySelector("#txtTelefono").value = "";
	document.querySelector("#datFechaNacimiento").value = "";
}

function llenarTabla() {
	var listaProfesores = obtenerListaProfesores();
	var td, text, fila;
	var tbody = document.querySelector("#tblProfesores tbody");

	tbody.innerHTML = "";

	if(listaProfesores != null){
				
		for (var i = 0; i < listaProfesores.length; i++) {
			var listaAcademias = obtenerAcademiasPorProfesor(listaProfesores[i]["idProfesor"]);
			var academias = "";

			fila = tbody.insertRow(i);
			
			var tdNombre = fila.insertCell(0);
			tdNombre.classList = "center";
			var nombre = listaProfesores[i]["nombre"] + " " + listaProfesores[i]["primer_apellido"] + " " + listaProfesores[i]["segundo_apellido"];
			tdNombre.appendChild(document.createTextNode((nombre)));

			var tdId = fila.insertCell(1);
			tdId.classList = "center";
			tdId.appendChild(document.createTextNode((listaProfesores[i]["identificacion"])));

			var tdCorreo = fila.insertCell(2);
			tdCorreo.classList = "center";
			tdCorreo.appendChild(document.createTextNode((listaProfesores[i]["correo"])));

			//Lista las academias de cada profesor
			for (var x = 0; x <= listaAcademias.length-1 ; x++) {				
				academias +=  listaAcademias[x]["nombre"] + " ";
			}

			academias = academias == "" ? "-" : academias;

			var tdAcademia = fila.insertCell(3);
			tdAcademia.classList = "center";
			tdAcademia.appendChild(document.createTextNode(academias));


			//Acciones
			var td = fila.insertCell(listaProfesores[i].length);
			var btnEditar = document.createElement("button");
			var btnActivar = document.createElement("button");
			var activo = listaProfesores[i]["estado"] === "false" ? "Activar" : "Desactivar";
			var claseOjo = activo === "Activar" ? "fa-eye" : "fa-eye-slash";
			
			td.classList= "center";
			
			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaProfesores[i]["idUsuario"];
			btnEditar.classList ="btn btnIcono fa fa-pencil";
			btnEditar.addEventListener("click", llenarFormulario);
			btnEditar.setAttribute("data-idProfesor", listaProfesores[i]["idProfesor"]);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaProfesores[i]["idUsuario"];
			btnActivar.classList = "btn btnIcono fa "+ claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnEditar);
			td.appendChild(btnActivar);
		}
	}
	
	if(listaProfesores.length == 0){
		document.querySelector("#msg_noOrganizacions").style.display = "";
	}
	else{
		document.querySelector("#tblProfesores").style.display = "";
	}
}

function llenarListaAcademias(){
	var listaAcademias = document.querySelector("#txtAcademia");
	var academias = obtenerAcademias();
	
	for(var i = 0; i < academias.length; i++) {
		var opt = academias[i]["nombre"];
		var el = document.createElement("option");
		
		el.textContent = opt;
		el.value = opt;
		el.id = academias[i]["idAcademia"];
		listaAcademias.appendChild(el);
	}
}