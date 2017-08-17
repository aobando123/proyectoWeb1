var botonAgregar = document.querySelector("#btnAgregar");
var botonRegistrar = document.querySelector("#btnRegistrar");
var botonActualizar = document.querySelector("#btnActualizar");
var titulo = document.querySelector("#titulo");
var modal = document.querySelector(".remodal-overlay");


botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);

botonAgregar.addEventListener("click", llamarModal);

// Hacer filtro
var table = document.querySelector("#tblOrganizaciones").tBodies[0];

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


llenarTabla();

function llamarModal() {
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar Organizacion"
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}

function obtenerDatos() {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var arrFormulario = [];
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value;
	}
	return arrFormulario;
}

function validarDatos(arrDatos) {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var span = document.querySelectorAll(".span-error");

	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===""){
				span[i].innerHTML =" * Campo requerido";
				valido = false;
			}
		}
	}
	return valido;
}

function registrarDatos () {
	var bActivo = true;
	var arrDatos = obtenerDatos();

	if(validarDatos(arrDatos) && validarCodOrg()){
		arrDatos.push(bActivo);
		document.querySelector(".remodal-overlay").style.display = "none";
		agregarOrganizacion(arrDatos);
		llenarTabla();
		window.location.hash='';
		limpiarFormulario();
		llamarAlerta("success",
			"Organización registrada",
			"Los datos han sido registrados satisfactoriamente"
		);
	}
}

function actualizarDatos()
{
	var bActivo = true;
	var arrDatos = obtenerDatos();
	arrDatos.push(bActivo);
	arrDatos.unshift(Number (botonActualizar.name));

	modificarOrganizacion(arrDatos);
	limpiarFormulario();
	cambiarBotones("agregar");
	window.location.hash='';
	llenarTabla();
	llamarAlerta("success",
		"Información del organización actualizada",
		"Los datos han sido actualizados satisfactoriamente"
	);

}
function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo="activado";
	desactivarActivarOrg(Number(this.name), activo);
	if(activo){
		mensajeActivo = "activada";
	}
	else{
		mensajeActivo="desactivada";
	}
	llenarTabla();
	llamarAlerta("warning",
		"Organización "+ mensajeActivo,
		"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente"
	);
}

/*Inicio: Función para validar que no existan códigos de organizaciones duplicados*/

function validarCodOrg() {
	var spanID = document.querySelector(".span-error1");
	
	var cod = document.querySelector('#numCodigo').value;
	var listaOrganizaciones = obtenerListaOrganizaciones();
	var valido = true;

	for (var i = 0; i < listaOrganizaciones.length; i++) {
		if (Number(listaOrganizaciones[i][2]) === Number(cod)){
			valido = false;
			spanID.innerHTML = " Organización ya existe.";
		}
	}
	return valido;

}

/*Fin: Función para validar que no existan códigos de organizaciones duplicados*/

function llenarFormulario() {
	cambiarBotones("actualizar", this.name);
		document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar organización"


	var infoOrganizacion =buscarOrganizacionCodigo(this.name);


	document.querySelector("#txtNombreOrg").value = infoOrganizacion[1];//cuando se traten de select poner 1
	document.querySelector("#numCodigo").value = infoOrganizacion[2]
	document.querySelector("#txtTipoOrg").value = infoOrganizacion[3];
	document.querySelector("#descOrg").value = infoOrganizacion[4];

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

	document.querySelector("#txtNombreOrg").value = "";//cuando se traten de select poner 1
	document.querySelector("#numCodigo").value = "";
	document.querySelector("#txtTipoOrg").value = "";
	document.querySelector("#descOrg").value = "";

}

function llenarTabla() {
	var listaOrganizaciones = obtenerListaOrganizaciones();
	var td, text, fila;

	var tbody = document.querySelector("#tblOrganizaciones tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaOrganizaciones != null){
		for (var i = 0; i < listaOrganizaciones.length; i++) {

			fila = tbody.insertRow(i);//fila
			for (var columna = 1; columna < listaOrganizaciones[i].length -1; columna++) {
				td = fila.insertCell(columna-1);
				text = document.createTextNode(listaOrganizaciones[i][columna]);
				td.appendChild(text);
			}

			var td = fila.insertCell(listaOrganizaciones[i].length -2);
			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var activo = listaOrganizaciones[i][listaOrganizaciones[i].length-1] === false ? "Activar" : "Desactivar";
			var claseOjo = listaOrganizaciones[i][listaOrganizaciones[i].length-1] === false ? "fa-eye" : "fa-eye-slash";
			
			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaOrganizaciones[i][0];
			btnEditar.classList="btn btnIcono fa fa-pencil";
			//classList = Propiedad class del html
			btnEditar.addEventListener("click", llenarFormulario);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaOrganizaciones[i][0];
			btnActivar.classList="btn btnIcono fa "+ claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnEditar);
			td.appendChild(btnActivar);
		}
	}
}
