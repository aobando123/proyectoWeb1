var btnAgregar = document.querySelector("#btnAgregar");

if (btnAgregar != null){
	btnAgregar.addEventListener("click", registrarEvento);
}

function registrarEvento(){
	window.location.href = "registrarEvento.html";
}

function editarEvento(event){
	window.location.href = "modificarEvento.html?id=" + event.currentTarget.name;
}

llenarTabla();

var table = document.querySelector("#tablaEventos").tBodies[0];

if(table != null){
	var busqueda = document.querySelector("#buscar");
	busqueda.addEventListener("keyup", buscaTabla);
}

function buscaTabla(){
  texto = busqueda.value.toLowerCase();
  var contador = 0;
  
  while(row = table.rows[contador++])
  {
	if (row.innerText.toLowerCase().indexOf(texto) !== -1 ){
		row.style.display = null;
	}
	
	else{
		row.style.display = "none";
	}
  }
}


function obtenerValores(){
	var form = obtenerElementos();
	var arrFormulario = [];
	
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	
	return arrFormulario;
}


function activarDesactivarBoton(){
	var mensajeActivo = "";
	var activar = this.value === "Activo" ? false : true;
	desactivarActivarItem(Number(this.name), activar);
	if(activar){
		this.className = "btn btnIcono fa fa-eye-slash";
		this.value = "Activo";
		mensajeActivo = "activado";
	}
	else{
		this.className = "btn btnIcono fa fa-eye";
		this.value = "Inactivo";
		mensajeActivo = "desactivado";
	}
	llamarAlerta("warning",
		"Lugar "+ mensajeActivo,
		"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente"
	);
}

function llenarFormulario() {
	cambiarBotones("actualizar", this.name);

	var infoItem =buscarItemCodigo(this.name);

	/*Parte completamente editable*/
	document.querySelector("#listaEmpresas").value = Number(infoItem[1]);//cuando se traten de select pasarlos a number
	document.querySelector("#txtCodigo").value = infoItem[2];
	document.querySelector("#txtProducto").value = infoItem[3];
	document.querySelector("#txtPrecio").value = infoItem[4];

}

function cambiarBotones(btn, id) {
	if(btn === "actualizar"){
		botonActualizar.className = botonActualizar.className.replace("noDisplay", "display");
		botonActualizar.name = id;//guardar el id
		botonRegistrar.className = botonRegistrar.className.replace("display", "noDisplay");
	}
	else {
		botonActualizar.className = botonActualizar.className.replace("display", "noDisplay");
		botonRegistrar.className = botonRegistrar.className.replace("noDisplay", "display");	
	}
}


function llenarTabla() {
	var listaEventos = obtenerlistaEventos();
	var td, text, fila;

	var tbody = document.querySelector("#tablaEventos tbody");
	tbody.innerHTML ="";
	
	if(listaEventos != null){
		for (var i = 0; i < listaEventos.length; i++) {

			fila = tbody.insertRow(i);//fila
			// se necesitan datos: 2,5,4,7
			td = fila.insertCell(0);
			text = document.createTextNode(listaEventos[i][1]);
			td.appendChild(text);
			
			td = fila.insertCell(1);
			text = document.createTextNode(listaEventos[i][4]);
			td.appendChild(text);
			
			td = fila.insertCell(2);
			var fecha = listaEventos[i][2] + "/" + listaEventos[i][3];
			text = document.createTextNode(fecha);
			td.appendChild(text);
			
			td = fila.insertCell(3);
			text = document.createTextNode(listaEventos[i][8]);
			td.appendChild(text);
			
			
			/*CODIGO PARA AGREGAR BOTONES */
			var td = fila.insertCell(4);
			
			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var activo = listaEventos[i][listaEventos[i].length-1] === true;

			
			btnEditar.value = "Editar";
			btnEditar.name =  listaEventos[i][0];
			btnEditar.classList = "btnEditar btn btnIcono fa fa-pencil";
			btnEditar.addEventListener("click", editarEvento);
			td.appendChild(btnEditar);
			
			btnActivar.value = !activo ? "Inactivo" : "Activo";
			btnActivar.name = listaEventos[i][0];
			btnActivar.classList = !activo ? "btn btnIcono fa fa-eye" : "btn btnIcono fa fa-eye-slash";
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnActivar);
		}
	}
}