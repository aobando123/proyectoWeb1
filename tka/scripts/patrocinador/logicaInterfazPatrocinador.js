var span = document.querySelectorAll(".span-error");
var botonAgregar = document.querySelector("#btnAgregar");
var botonRegistrar = document.querySelector("#btnRegistrar");
var botonActualizar = document.querySelector("#btnActualizar");
var titulo = document.querySelector("#titulo");
var modal = document.querySelector(".remodal-overlay");

// Eventos atentos a "clicks" en los botones para ejecutar funciones
botonAgregar.addEventListener("click", llamarModal);
botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);

//hacer filtro
var table = document.querySelector("#tblPatrocinadores").tBodies[0];
// Valida que la tabla tenga datos
if(table != null){
	var busqueda = document.querySelector('#buscar');
	busqueda.addEventListener("keyup", buscaTabla);
}
// Funcion que busca dentro de la tabla de patrocinadores con lo que trae la base de datos
function buscaTabla(){
	texto = busqueda.value.toLowerCase();
	var r=0;
	while(row = table.rows[r++]){
		if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
			row.style.display = null;
		else
			row.style.display = 'none';
	}
}



// Funcion que hace aparecer y desaparecer el modal
function llamarModal(){
	window.location.href = "#modal";
	titulo.innerHTML="Registrar patrocinador";
	cambiarBotones("Registrar",0);
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}

// Funcion que agarra los datos del formulario, y los comvierte en un arreglo
function obtenerDatos(){
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var arrFormulario = [];
	for (var i = 0; i < form.length; i++) {
		if(i===1){
			arrFormulario[i] = form[i].files[0] || 0;
		}
		else{
			arrFormulario[i] = form[i].value || 0;
		}
	}
	return arrFormulario;
}

//funcion para validar datos
function validarDatos(arrDatos) {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===0){
				span[i].innerHTML ="Campo requerido";
				valido = false;
			}
			else{
				span[i].innerHTML ="*";
			}
		}
	}
	return valido;
}
function hola() {

}

//Funcion que regitra los patrocinadores en caso que las validaciones sean correctas
function registrarDatos () {
	var bActivo = "Activo";
	var arrDatos = obtenerDatos();

	if(validarDatos(arrDatos)){
		arrDatos.push(bActivo);
		document.querySelector(".remodal-overlay").style.display = "none";
		convertirImagen(arrDatos, "agregar");
		llenarTabla();
		window.location.hash='';
		limpiarFormulario();
		llamarAlerta("success", "Patrocinador registrado", "Los datos han sido registrados satisfactoriamente");
	}
}
// Funcion para listar patrocinadores
function llenarTabla () {
	var listaPatrocinadores = obtenerListaPatrocinadores();
	var td, text, fila;
	var tbody = document.querySelector("#tblPatrocinadores tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaPatrocinadores != null){
		for (var i = 0; i < listaPatrocinadores.length; i++) {

			fila = tbody.insertRow(i);//fila
			for (var columna = 1; columna < listaPatrocinadores[i].length -1 ; columna++) {
				td = fila.insertCell(columna-1);
				td.classList= "center";
				if(columna === 2){

					var imagen = document.createElement('img');
					imagen.src =listaPatrocinadores[i][columna];
					imagen.classList = "perfil"
					td.appendChild(imagen);
				} else{
					text = document.createTextNode(listaPatrocinadores[i][columna]);
					td.appendChild(text);
				}

			}

			var td = fila.insertCell(listaPatrocinadores[i].length -2);
			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var activo = listaPatrocinadores[i][listaPatrocinadores[i].length -1] === false ? "Activar" : "Desactivar";
			var claseOjo = listaPatrocinadores[i][listaPatrocinadores[i].length -1] === false ? "fa-eye" : "fa-eye-slash";
			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaPatrocinadores[i][0];
			btnEditar.classList="btn btnIcono fa fa-pencil";
			btnEditar.addEventListener("click", llenarFormulario);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaPatrocinadores[i][0];
			btnActivar.classList="btn btnIcono fa "+ claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnEditar);
			td.appendChild(btnActivar);
		}
	}
}


// ---------------------------------
function actualizarDatos()
{
	var bActivo = true;
	var arrDatos = obtenerDatos();
	arrDatos.push(bActivo);
	arrDatos.unshift(Number (botonActualizar.name));

	if(arrDatos[1]===0){
		modificarPatrocinador(arrDatos);
		llenarTabla();
	}
	else{
		convertirImagen(arrDatos,"modificar")
	}

	limpiarFormulario();
	cambiarBotones("agregar");
	window.location.hash='';
	llamarAlerta("success",
		"Patrocinador actualizado",
		"Los datos han sido actualizados satisfactoriamente");

}

function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo="activado";
	desactivarActivarPatrocinador(Number(this.name), activo);
	if(activo){
		mensajeActivo = "activado";
	}
	else{
		mensajeActivo="desactivado";
	}

	llamarAlerta("warning",
		"Patrocinador "+ mensajeActivo,
		"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente"

		);
	llenarTabla();
}





function llenarFormulario() {
	cambiarBotones("actualizar", this.name);

	window.location.href = "#modal";
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	titulo.innerHTML = "Modificar Patrocinador"

	var infoPatrocinador =buscarPatrocinadorCodigo(this.name);

	document.querySelector("#txtNombrePatrocinador").value = infoPatrocinador[1];//cuando se traten de select pasarlos a number

	document.querySelector("#txtNombreCompannia").value = infoPatrocinador[3];


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
	document.querySelector("#txtNombrePatrocinador").value = "";//cuando se traten de select poner 1
	document.querySelector("#imageCompany").value="";
	document.querySelector("#txtNombreCompannia").value = "";
}
