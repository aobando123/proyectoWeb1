var span = document.querySelectorAll(".span-error");
var botonAgregar = document.querySelector("#btnAgregar");
var botonRegistrar = document.querySelector("#btnRegistrar");
var botonActualizar = document.querySelector("#btnActualizar");
var titulo = document.querySelector("#titulo");
var modal = document.querySelector(".remodal-overlay");

botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);

botonAgregar.addEventListener("click", llamarModal);

// Hacer filtro
var table = document.querySelector("#tblAdministradores").tBodies[0];

if(table != null){
	var busqueda = document.querySelector('#buscar');
	busqueda.addEventListener('keyup', buscaTabla);
	}

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
//

llenarTabla();

function llenarTabla() {
	var listaadmnistradores = obtenerAdministradores();
	var td, text, fila;
	var campos = ["","foto","nombre","correo","estado"]
	var tbody = document.querySelector("#tblAdministradores tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaadmnistradores != null){
		for (var i = 0; i < listaadmnistradores.length; i++) {

			fila = tbody.insertRow(i);//fila
			for (var columna = 1; columna < Object.keys(listaadmnistradores[i]).length -1 ; columna++) {
					td = fila.insertCell();
					td.classList= "center";
				if(columna === 1){

					var imagen = document.createElement('img');
					imagen.src =listaadmnistradores[i][campos[columna]];
					imagen.classList = "perfil"
					td.appendChild(imagen);
				} else{
					text = document.createTextNode(listaadmnistradores[i][campos[columna]]);
					td.appendChild(text);
				}

			}


			var td = fila.insertCell();
			td.classList= "center";
			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var activo = listaadmnistradores[i]["estado"] === "desactivo" ? "Activar" : "Desactivar";
			var claseOjo = listaadmnistradores[i]["estado"] === "desactivo" ? "fa-eye" : "fa-eye-slash";
			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaadmnistradores[i]["idUsuario"];
			btnEditar.classList="btn btnIcono centerIcon fa fa-pencil";
			btnEditar.addEventListener("click", llenarFormulario);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaadmnistradores[i]["idUsuario"];
			btnActivar.classList="btn btnIcono fa "+ claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnEditar);
			td.appendChild(btnActivar);
		}
	}
}

function llamarModal() {
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar Administrador"
	cambiarBotones("Registrar",0);
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}
//FIJARSE EN ESTO
function obtenerDatos() {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var arrFormulario = [];
	for (var i = 0; i < form.length; i++) {
		if(i===0){
			arrFormulario[i] = form[i].files[0] || "images/perfil.jpg";
		}
		else{
			arrFormulario[i] = form[i].value || 0;
		}


	}
	return arrFormulario;
}

function validarDatos(arrDatos) {
  var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===0){
				span[i].innerHTML =" Campo requerido";
				valido = false;
			}
			else{
				if(i===2 && !(checkEmail.test(arrDatos[2])) ){
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

function registrarDatos () {
	var bActivo = true;
	var arrDatos = obtenerDatos();

	if(validarDatos(arrDatos)){
		arrDatos.push(bActivo);
		document.querySelector(".remodal-overlay").style.display = "none";
		agregarUsuario(arrDatos[0],arrDatos[1],arrDatos[2],"administrador");
		llenarTabla();
		window.location.hash='';
		limpiarFormulario();
		llamarAlerta("success",
		"Administrador registrado",
		"Los datos han sido registrados satisfactoriamente");

	}

}
function actualizarDatos(){
	var bActivo = true;
	var arrDatos = obtenerDatos();
	
	if (validarDatos(arrDatos)) {
		arrDatos.push(Number(botonActualizar.name))
		if(arrDatos[0]==="images/perfil.jpg"){
			modificarUsuario(arrDatos);
		}
		else{
			convertirImagen(arrDatos,"modificar")
		}
		limpiarFormulario();
		cambiarBotones("agregar");
		window.location.hash='';
		llamarAlerta("success",
		"Administrador actualizado",
		"Los datos han sido actualizados satisfactoriamente");
	}



}
function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo="activado";
	desactivarActivarUsuario(Number(this.name), activo);
	if(activo){
		mensajeActivo = "activado";
	}
	else{
		mensajeActivo="desactivado";
	}
	llamarAlerta("warning",
	"Administrador "+ mensajeActivo,
	"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente");
}




function llenarFormulario() {
	cambiarBotones("actualizar", this.name);
	window.location.href = "#modal";
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	titulo.innerHTML = "Modificar administrador"



	document.querySelector("#txtAdministrador").value = this.parentNode.parentNode.children[1].innerText;//cuando se traten de select poner 1
	document.querySelector("#txtCorreo").value = this.parentNode.parentNode.children[2].innerText;

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
	//Editable
		document.querySelector("#imgPerfil").value=""
		document.querySelector("#txtAdministrador").value = "";//cuando se traten de select poner 1
		document.querySelector("#txtCorreo").value = "";
}