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
var table = document.querySelector("#tblAcademias").tBodies[0];

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

function llamarModal(){
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar Academia"
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}

function obtenerDatos(){
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var arrFormulario = [];
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	return arrFormulario;
}

function validarDatos(arrDatos){
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===0){
				span[i].innerHTML =" Campo requerido";
				valido = false;
			}
			else{
				span[i].innerHTML ="*";
			}
		}
	}
	return valido;
}

function registrarDatos(){
	var bActivo = true;
	var arrDatos = obtenerDatos();

	if(validarDatos(arrDatos)){
		arrDatos.push(bActivo);
		document.querySelector(".remodal-overlay").style.display = "none";
		agregarAcademia(arrDatos);
		llenarTabla();
		window.location.hash='';
		limpiarFormulario();
		llamarAlerta("success",
			"Academia registrada",
			"Los datos han sido registrados satisfactoriamente"
		);
	}
}

function actualizarDatos(){
	var bActivo = true;
	var arrDatos = obtenerDatos();
	arrDatos.push(bActivo);
	arrDatos.unshift(Number (botonActualizar.name));

	modificarAcademia(arrDatos);
	limpiarFormulario();
	cambiarBotones("agregar");
	window.location.hash='';
	llenarTabla();
	llamarAlerta("success",
		"Academia actualizada",
		"Los datos han sido actualizados satisfactoriamente"
	);
}

function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo="activado";
	desactivarActivarAcademia(Number(this.name), activo);
	if(activo){
		mensajeActivo = "activado";
	}
	else{
		mensajeActivo="desactivado";
	}
	llenarTabla();
	llamarAlerta("warning",
		"Academia desactivada",
		"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente"
	);
}

function llenarFormulario(){
	cambiarBotones("actualizar", this.name);
		document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar academia"
	var infoAcademia =buscarAcademiaCodigo(this.name);
	document.querySelector("#txtNombreAcademia").value = infoAcademia[1];//cuando se traten de select poner 1
	document.querySelector("#txtUbicacion").value = infoAcademia[2];
	document.querySelector("#txtTelefono").value = infoAcademia[3];
	document.querySelector("#txtNombreContacto").value = infoAcademia[4];
	document.querySelector("#txtCorreo").value = infoAcademia[5];
}

function cambiarBotones(btn, id){
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
	document.querySelector("#txtNombreAcademia").value = "";//cuando se traten de select poner 1
	document.querySelector("#txtUbicacion").value = "";
	document.querySelector("#txtTelefono").value = "";
	document.querySelector("#txtNombreContacto").value = "";
	document.querySelector("#txtCorreo").value = "";
}

// function llenarTabla(){


// 	tbody.innerHTML ='';//limpia la tabla

// 	if(listaAcademias != null){
// 		for (var i = 0; i < listaAcademias.length; i++) {
// 			fila = tbody.insertRow(i);//fila
// 			for (var columna = 1; columna < listaAcademias[i].length -1 ; columna++) {
// 				td = fila.insertCell(columna-1);
// 				td.classList= "center";
// 				if(columna === 2){
// 					var imagen = document.createElement('img');
// 					imagen.src =listaAcademias[i][columna];
// 					imagen.classList = "perfil"
// 					td.appendChild(imagen);
// 				} else{
// 					text = document.createTextNode(listaAcademias[i][columna]);
// 					td.appendChild(text);
// 				}
// 			}
// 			var td = fila.insertCell(listaAcademias[i].length -2);
// 			var btnEditar = document.createElement('button');
// 			var btnActivar = document.createElement('button');
// 			var activo = listaAcademias[i][listaAcademias[i].length -1] === false ? "Activar" : "Desactivar";
// 			var claseOjo = listaAcademias[i][listaAcademias[i].length -1] === false ? "fa-eye" : "fa-eye-slash";
// 			btnEditar.type = "button";
// 			btnEditar.value = "Editar";
// 			btnEditar.name =  listaAcademias[i][0];
// 			btnEditar.classList="btn btnIcono fa fa-pencil";
// 			btnEditar.addEventListener("click", llenarFormulario);

// 			btnActivar.type = "button";
// 			btnActivar.value = activo;
// 			btnActivar.name = listaAcademias[i][0];
// 			btnActivar.classList="btn btnIcono fa "+ claseOjo;
// 			btnActivar.addEventListener("click", activarDesactivarBoton);

// 			td.appendChild(btnEditar);
// 			td.appendChild(btnActivar);
// 		}
// 	}
// }

function llenarTabla() {
	var listaAcademias = obtenerListaAcademias();
	var td, text, fila;
	var tbody = document.querySelector("#tblAcademias tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaAcademias != null){
		for (var i = 0; i < listaAcademias.length; i++) {
			fila = tbody.insertRow(i);//fila
			td = fila.insertCell(0);
			text = document.createTextNode(listaAcademias[i].nombre_academia);
			td.appendChild(text);

			td = fila.insertCell(1);
			text = document.createTextNode(listaAcademias[i].telefono);
			td.appendChild(text);

			td = fila.insertCell(2);
			text = document.createTextNode(listaAcademias[i].ubicacion);
			td.appendChild(text);


			td = fila.insertCell(3);
			text= document.createTextNode(listaAcademias[i].persona_contacto);
			td.appendChild(text);

			td = fila.insertCell(4);
			text= document.createTextNode(listaAcademias[i].correo);
			td.appendChild(text);

			/*CODIGO PARA AGREGAR BOTONES */
			td = fila.insertCell(5);

			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var claseOjo = listaAcademias[i][listaAcademias[i].length-1] === false? "fa-eye" : "fa-eye-slash";
			var activo = listaAcademias[i][listaAcademias[i].length-1] === false ? "Activar" : "Desactivar";

			btnEditar.value = "Editar";
			btnEditar.name =  listaAcademias[i][0];
			btnEditar.classList = "fa fa-pencil centericon actdes";
			btnEditar.addEventListener("click", llenarFormulario);
			td.appendChild(btnEditar);

			//btnActivar.value = !activo ? "Inactivar" : "Activar";
			btnActivar.value = activo;
			btnActivar.name = listaAcademias[i][0];
			btnActivar.classList ="btn btnIcono fa " +claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnActivar);
		}
	}
}
