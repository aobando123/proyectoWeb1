var botonAgregar = document.querySelector("#btnAgregar");
var botonRegistrar = document.querySelector("#btnRegistrar");
var botonActualizar = document.querySelector("#btnActualizar");
var titulo = document.querySelector("#titulo");
var modal = document.querySelector(".remodal-overlay");


botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);

botonAgregar.addEventListener("click", llamarModal);

// Hacer filtro
var table = document.querySelector("#tblProfesores").tBodies[0];

if(table != null){
	var busqueda = document.querySelector('#buscar');
	busqueda.addEventListener('keyup', buscaTabla);
}

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


llenarTabla();

function llamarModal() {
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar Profesor"
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}

function obtenerDatos() {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var arrFormulario = [];
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value;
	}

	arrFormulario.push();
	return arrFormulario;
}

function validarDatos(arrDatos) {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var span = document.querySelectorAll(".span-error");

	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===""){
				span[i].innerHTML =" Campo requerido";
				valido = false;
			}
		}
	}
	return valido;
}

/*Inicio: Función encargada de validar que no existan profesores con Id duplicados */
function validarNumId () {
	var spanID = document.querySelector(".span-error2");

	var numId = document.querySelector('#numId').value;
	var listaProfesores = obtenerListaProfesores();
	var valido = true;

	for (var i = 0; i < listaProfesores.length; i++) {
		if (Number(listaProfesores[i][4]) === Number(numId)){
			valido = false;
			spanID.innerHTML = " Usuario ya existe.";
		}
	}

	return valido;
}
/*Fin: Función encargada de validar que no existan profesores con Id duplicados */


/*Inicio: Función encargada de validar que no existan profesores con email duplicados */
function validarEmail () {
	var spanEmail = document.querySelector(".span-error3");

	var email = document.querySelector('#emCorreoElect').value;
	var listaProfesores = obtenerListaProfesores();
	var valido = true;

	for (var j = 0; j < listaProfesores.length; j++) {
		if (String(listaProfesores[j][5]) === String(email)){
			valido = false;
			spanEmail.innerHTML = " Usuario ya existe.";
		}
	}

	return valido;
}
/*Fin: Función encargada de validar que no existan profesores con email duplicados */


function registrarDatos () {
	var bActivo = true;
	var arrDatos = obtenerDatos();

	var edad = calcularEdad();

	if(validarNumId() && validarEmail() && validarDatos(arrDatos)) {
		arrDatos.push(edad);
		arrDatos.push(bActivo);
		document.querySelector(".remodal-overlay").style.display = "none";
		agregarProfesor(arrDatos);
		llenarTabla();
		window.location.hash='';
		limpiarFormulario();
		llamarAlerta("success",
			"Profesor registrado",
			"Los datos han sido registrados satisfactoriamente"
		);
	}
}

/*Inicio: Función para calcular la edad*/
function calcularEdad() {

    var cumple = document.getElementById('datFechaNacimiento').value;
    var cumpleanios = +new Date(cumple);
    var edad = ((Date.now() - cumpleanios) / (31557600000));

    edad = Math.trunc(edad);

    return edad;
}
/*Fin: Función para calcular la edad*/

/*Inicio: Función para crear una lista con las academias y enviarlas al select*/
function llenarListaAcademias(){
	var listaAcademias = document.querySelector("#txtAcademia");
	var academias = obtenerAcademias();

	for(var i = 0; i < academias.length; i++) {
		var opt = academias[i][1];
		var el = document.createElement("option");

		el.textContent = opt;
		el.value = opt;
		el.id = lugares[i][0];
		el.setAttribute("data-espacio", academias[i][5]);
		listaAcademias.appendChild(el);
	}
}
/*Fin: Función para crear una lista con las academias y enviarlas al select*/


function actualizarDatos()
{
	var bActivo = true;
	var arrDatos = obtenerDatos();
	arrDatos.push(bActivo);
	arrDatos.unshift(Number (botonActualizar.name));

	modificarProfesor(arrDatos);
	limpiarFormulario();
	cambiarBotones("agregar");
	window.location.hash='';
	llenarTabla();
	llamarAlerta("success",
		"Información del profesor actualizada",
		"Los datos han sido actualizados satisfactoriamente"
	);

}
function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo="activado";
	desactivarActivarProfesor(Number(this.name), activo);
	if(activo){
		mensajeActivo = "activado";
	}
	else{
		mensajeActivo="desactivado";
	}
	llenarTabla();
	llamarAlerta("warning",
		"Profesor "+ mensajeActivo,
		"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente"
	);
}


function llenarFormulario() {
	cambiarBotones("actualizar", this.name);
		document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar Profesor"


	var infoProfesor = buscarProfesorCodigo(this.name);


	document.querySelector("#txtNombreProf").value = infoProfesor[1];//cuando se traten de select poner 1
	document.querySelector("#txt1Apellido").value = infoProfesor[2]
	document.querySelector("#txt2Apellido").value = infoProfesor[3];
	document.querySelector("#numId").value = infoProfesor[4];
	document.querySelector("#emCorreoElect").value = infoProfesor[5];
	document.querySelector("#txtTelefono").value = infoProfesor[6];
	document.querySelector("#txtGenero").value = infoProfesor[7];
	document.querySelector("#txtAcademia").value = infoProfesor[8];
	document.querySelector("#datFechaNacimiento").value = infoProfesor[9];
}

function cambiarBotones(btn, id) {
	if(btn === "actualizar"){
		botonActualizar.className = botonActualizar.className.replace("display-none", "display-block");
		botonActualizar.name =id;//guardar el id
		botonRegistrar.className = botonRegistrar.className.replace("display-block", "display-none");
	}
	else {
		botonActualizar.className = botonActualizar.className.replace("display-block", "display-none");
		botonRegistrar.className = botonRegistrar.className.replace("display-none", "display-block");
	}
}

function limpiarFormulario(){

	document.querySelector("#txtNombreProf").value = "";//cuando se traten de select poner 1
	document.querySelector("#txt1Apellido").value = "";
	document.querySelector("#txt2Apellido").value = "";
	document.querySelector("#numId").value = "";
	document.querySelector("#emCorreoElect").value = "";
	document.querySelector("#txtGenero").value = "";
	document.querySelector("#txtAcademia").value = "";
	document.querySelector("#txtTelefono").value = "";
	document.querySelector("#datFechaNacimiento").value = "";

}

function llenarTabla() {
	var listaProfesores = obtenerListaProfesores();
	var td, text, fila;

	var tbody = document.querySelector("#tblProfesores tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaProfesores != null){
		for (var i = 0; i < listaProfesores.length; i++) {

			fila = tbody.insertRow(i);//fila

			td = fila.insertCell(0);
			text = document.createTextNode(listaProfesores[i][1]);
			td.appendChild(text);

			td = fila.insertCell(1);
			text = document.createTextNode(listaProfesores[i][2]);
			td.appendChild(text);

			td = fila.insertCell(2);
			text = document.createTextNode(listaProfesores[i][4]);
			td.appendChild(text);

			td = fila.insertCell(3);
			text = document.createTextNode(listaProfesores[i][5]);
			td.appendChild(text);


			var td = fila.insertCell(4);
			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var activo = listaProfesores[i][listaProfesores[i].length-1] === false ? "Activar" : "Desactivar";
			var claseOjo = listaProfesores[i][listaProfesores[i].length-1] === false ? "fa-eye" : "fa-eye-slash";

			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaProfesores[i][0];
			btnEditar.classList="btn btnIcono fa fa-pencil";
			//classList = Propiedad class del html
			btnEditar.addEventListener("click", llenarFormulario);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaProfesores[i][0];
			btnActivar.classList="btn btnIcono fa "+ claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnEditar);
			td.appendChild(btnActivar);
		}
	}
}

function llenarListaAcademias(){
	var listaAcademias = document.querySelector("#txtAcademia");
	var academias = obtenerAcademias();

	for(var i = 0; i < academias.length; i++) {
		var opt = academias[i][1];
		var el = document.createElement("option");

		el.textContent = opt;
		el.value = opt;
		el.id = academias[i][0];
		listaAcademias.appendChild(el);
	}
}
