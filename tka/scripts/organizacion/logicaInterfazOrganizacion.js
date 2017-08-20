/*Botones*/
var botonAgregar = document.querySelector("#btnAgregar");
var botonRegistrar = document.querySelector("#btnRegistrar");
var botonActualizar = document.querySelector("#btnActualizar");

/*Eventos de los botones*/
botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);
botonAgregar.addEventListener("click", llamarModal);

/*Opciones del modal*/
var titulo = document.querySelector("#titulo");
var modal = document.querySelector(".remodal-overlay");

var table = document.querySelector("#tblOrganizaciones").tBodies[0];

if(table != null){
	var busqueda = document.querySelector('#buscar');
	
	busqueda.addEventListener('keyup', buscaTabla);
}

llenarTabla();

function buscaTabla(){
  texto = busqueda.value.toLowerCase();
  var r = 0;
  
  while(row = table.rows[r++])
  {
	if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
		row.style.display = null;
	else
	  row.style.display = "none";
  }
}

function llamarModal() {
	cambiarBotones("registrar", this.name);
	eliminarMsjRequerido();
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar organización"
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
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

function obtenerCampos() {
	return document.querySelectorAll('form input:not([type="button"]), form select ');
}

function obtenerDatos() {
	var campos = obtenerCampos();
	var arrFormulario = [];
	
	for (var i = 0; i < campos.length; i++) {
		arrFormulario[i] = campos[i].value;
	}
	
	return arrFormulario;
}

function obtenerDatosOrganizacion(event){
	var tr = event.closest("tr");
	var datos = [];
	
	for(var x = 0; x < tr.childNodes.length; x++){
		datos.push(tr.childNodes[x].innerText);
	}
	
	return datos;
}

function validarDatos(arrCampos) {
	var span = document.querySelectorAll(".span-error");
	var valido = true;
	
	for (var i = 0; i < arrCampos.length; i++) {
	
		if (arrCampos[i].classList[0] === "requerido") {
			if(arrCampos[i].value === ""){
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
	var arrCampos = obtenerCampos();

	if(validarDatos(arrCampos)){
		arrDatos.push(bActivo);
		document.querySelector(".remodal-overlay").style.display = "none";
		agregarOrganizacion(arrDatos);
		llenarTabla();
		window.location.hash = "";
		
		limpiarFormulario();
		
		llamarAlerta("success",
			"Organización registrada",
			"Los datos han sido registrados satisfactoriamente"
		);
	}
}

function actualizarDatos()
{
	var arrDatos = obtenerDatos();	
	arrDatos.push(this.name);
	
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
	var mensajeActivo = "activado";
	
	desactivarActivarOrg(this, activo);
	
	if(activo)
		mensajeActivo = "activada";
	
	else
		mensajeActivo = "desactivada";
	
	llamarAlerta("warning",
		"Organización " + mensajeActivo,
		"Los datos han sido " + mensajeActivo +  "s satisfactoriamente."
	);
}

/*Función para validar que no existan códigos de organizaciones duplicados*/

function validarCodOrg() {
	var spanID = document.querySelector(".span-error1");
	
	var cod = document.querySelector('#numCodigo').value;
	var listaOrganizaciones = obtenerListaOrganizaciones();
	var valido = true;

	for (var i = 0; i < listaOrganizaciones.length; i++) {
		if (Number(listaOrganizaciones[i][2]) === Number(cod)){
			valido = false;
			spanID.innerHTML = "Esta organización ya existe.";
		}
	}
	
	return valido;
}

function llenarFormulario() {
	eliminarMsjRequerido();
	cambiarBotones("actualizar", this.name);
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar organización"

	var infoOrganizacion = obtenerDatosOrganizacion(this);

	document.querySelector("#txtNombreOrg").value = infoOrganizacion[0];
	document.querySelector("#numCodigo").value = infoOrganizacion[1]
	document.querySelector("#txtTipoOrg").value = infoOrganizacion[2];
	document.querySelector("#descOrg").value = infoOrganizacion[3];
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
	
	document.querySelector("#txtNombreOrg").value = "";
	document.querySelector("#numCodigo").value = "";
	document.querySelector("#txtTipoOrg").value = 1;
	document.querySelector("#descOrg").value = "";

}

function llenarTabla() {
	var listaOrganizaciones = obtenerOrganizaciones();
	var td, text, fila;
	var campos = ["nombre","codigo", "tipo","descripcion"];
	var tbody = document.querySelector("#tblOrganizaciones tbody");

	tbody.innerHTML = "";

	if(listaOrganizaciones != null){
				
		for (var i = 0; i < listaOrganizaciones.length; i++) {

			fila = tbody.insertRow(i);
			
			for (var columna = 0; columna < Object.keys(listaOrganizaciones[i]).length -2 ; columna++) {
				td = fila.insertCell();
				td.classList= "center";
				
				text = document.createTextNode(listaOrganizaciones[i][campos[columna]]);
				td.appendChild(text);
			}

			var td = fila.insertCell(listaOrganizaciones[i].length);
			var btnEditar = document.createElement("button");
			var btnActivar = document.createElement("button");
			var activo = listaOrganizaciones[i]["estado"] === "false" ? "Activar" : "Desactivar";
			var claseOjo = activo === "Activar" ? "fa-eye" : "fa-eye-slash";
			
			td.classList= "center";
			
			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaOrganizaciones[i]["idOrganizacion"];
			btnEditar.classList ="btn btnIcono fa fa-pencil";
			btnEditar.addEventListener("click", llenarFormulario);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaOrganizaciones[i]["idOrganizacion"];
			btnActivar.classList = "btn btnIcono fa "+ claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnEditar);
			td.appendChild(btnActivar);
		}
	}
	
	if(listaOrganizaciones.length == 0){
		document.querySelector("#msg_noOrganizacions").style.display = "";
	}
	else{
		document.querySelector("#tblOrganizaciones").style.display = "";
	}
}
