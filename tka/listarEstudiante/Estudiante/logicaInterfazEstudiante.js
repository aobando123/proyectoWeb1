/*************************************************************************************************************
*											  Template														 *
**************************************************************************************************************
*	COSAS SE MOFICAN DE ESTE TEMPLATE:
*		~Los id (#) que se usan en los query selectors
*		~La palabra estudiante por la parte que esten trabajando usar ctrl+h para remplazar
		~cambiar la clase de los botones de editar y eliminar tambien el texto
*	IMPORTANTE
*		~Los codigo o id que van de primero
*		~Llenar tabla el for de columna inicia en 1 porque los id va de primero y no hay que mostrarlos
*


*/
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
var table = document.querySelector("#tblEstudiante").tBodies[0];

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


var dis1 = document.getElementById("numRepesaje");
dis1.onchange = function () {
   if (this.value != "" || this.value.length > 0) {
      document.getElementById("numPeso").disabled = true;
   }
};

llenarTabla();

function llamarModal() {
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar estudiante"
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}

function obtenerDatos() {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var arrFormulario = [];
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	return arrFormulario;
}

function validarDatos(arrDatos) {
	var count= 0;

	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var valido = true;
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===0){
				span[count].innerHTML =" Campo requerido";
				count++;
				valido = false;
			}
			else{
				span[count].innerHTML ="*";
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
		agregarestudiante(arrDatos);
		llenarTabla();
		window.location.hash='';
		limpiarFormulario();
		llamarAlerta("success",
		"estudiante registrado",
		"Los datos han sido registrados satisfactoriamente");
	}



}

function actualizarDatos()
{
	var bActivo = true;
	var arrDatos = obtenerDatos();
	arrDatos.push(bActivo);
	arrDatos.unshift(Number (botonActualizar.name));

	modificarestudiante(arrDatos);
	limpiarFormulario();
	cambiarBotones("agregar");
	window.location.hash='';
	llenarTabla();
	llamarAlerta("success",
	"estudiante actualizado",
	"Los datos han sido actualizados satisfactoriamente");

}
function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo="activado";
	desactivarActivarestudiante(Number(this.name), activo);
	if(activo){
		mensajeActivo = "activado";
	}
	else{
		mensajeActivo="desactivado";
	}
	llenarTabla();
	llamarAlerta("warning",
	"estudiante "+ mensajeActivo,
	"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente");
}


function llenarFormulario() {
	cambiarBotones("actualizar", this.name);
		document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar estudiante"


	var infoestudiante =buscarestudianteCodigo(this.name);


	document.querySelector("#txtNombre").value = infoestudiante[1];//cuando se traten de select poner 1
	document.querySelector("#txtApellido").value = infoestudiante[2]
	document.querySelector("#txtApellido2").value = infoestudiante[3];
	document.querySelector("#numTelefono").value = infoestudiante[4];
	document.querySelector("#txtGrado").value = infoestudiante[5];
	document.querySelector("#txtAltura").value = infoestudiante[6];
	document.querySelector("#numEdad").value = infoestudiante[7];
	document.querySelector("#txtAcademia").value = infoestudiante[8];
	document.querySelector("#numPeso").value = infoestudiante[9];
	if(infoestudiante[10]  > 0)
	{
			document.querySelector("#numRepesaje").disabled = false;
			document.querySelector("#numPeso").disabled = true;
	}
	else
	{
		document.querySelector("#numRepesaje").disabled = true;
		document.querySelector("#numPeso").disabled = false;
	}
	document.querySelector("#numRepesaje").value = infoestudiante[10];
	document.querySelector("#txtCorreoEl").value = infoestudiante[11];

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
	document.querySelector("#txtNombre").value = "";//cuando se traten de select poner 1
	document.querySelector("#txtApellido").value = "";
	document.querySelector("#txtApellido2").value = "";
	document.querySelector("#numTelefono").value = "";
	document.querySelector("#txtGrado").value = "";
	document.querySelector("#txtAltura").value = "";
	document.querySelector("#numEdad").value = "";
  document.querySelector("#txtAcademia").value = "";
  document.querySelector("#numPeso").value = "";
	document.querySelector("#numRepesaje").value = "";
	document.querySelector("#txtCorreoEl").value = "";

}

function llenarTabla() {
	var listaestudiantes = obtenerListaestudiantes();
	var td, text, fila;

	var tbody = document.querySelector("#tblEstudiante tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaestudiantes != null){
		for (var i = 0; i < listaestudiantes.length; i++) {

			fila = tbody.insertRow(i);//fila
			td = fila.insertCell(0);
			text = document.createTextNode(listaestudiantes[i][1]);
			td.appendChild(text);

			td = fila.insertCell(1);
			text = document.createTextNode(listaestudiantes[i][2]);
			td.appendChild(text);

			td = fila.insertCell(2);
			text = document.createTextNode(listaestudiantes[i][3]);
			td.appendChild(text);


			td = fila.insertCell(3);
			text= document.createTextNode(listaestudiantes[i][4]);
			td.appendChild(text);

			td = fila.insertCell(4);
			text = document.createTextNode(listaestudiantes[i][5]);
			td.appendChild(text);

			td = fila.insertCell(5);
			text = document.createTextNode(listaestudiantes[i][6]);
			td.appendChild(text);

			td = fila.insertCell(6);
			number = document.createTextNode(listaestudiantes[i][7]);
			td.appendChild(number);

			td = fila.insertCell(7);
			text = document.createTextNode(listaestudiantes[i][8]);
			td.appendChild(text);

			td = fila.insertCell(8);
			text = document.createTextNode(listaestudiantes[i][10]);
			td.appendChild(text);

			td = fila.insertCell(9);
			number = document.createTextNode(listaestudiantes[i][11]);
			td.appendChild(number);

			td = fila.insertCell(10);
			number = document.createTextNode(listaestudiantes[i][12]);
			td.appendChild(number);




			/*CODIGO PARA AGREGAR BOTONES */
			 td = fila.insertCell(11);

			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var claseOjo = listaestudiantes[i][listaestudiantes[i].length-1] === false? "fa-eye" : "fa-eye-slash";
      var activo = listaestudiantes[i][listaestudiantes[i].length-1] === false ? "Activar" : "Desactivar";

			btnEditar.value = "Editar";
			btnEditar.name =  listaestudiantes[i][0];
			btnEditar.classList = "fa fa-pencil centericon actdes";
			btnEditar.addEventListener("click", llenarFormulario);
			td.appendChild(btnEditar);

			//btnActivar.value = !activo ? "Inactivar" : "Activar";
			btnActivar.value = activo;
			btnActivar.name = listaestudiantes[i][0];
			btnActivar.classList ="btn btnIcono fa " +claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			/*
			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaestdiantes[i][0];
			//btnActivar.classList="btn btnIcono fa "+ claseOjo;
			btnActivar.classList = !activo ? "fa fa-eye centericon actdes" : "fa fa-eye-slash centericon actdes";
			btnActivar.addEventListener("click", activarDesactivarBoton);
			*/

			td.appendChild(btnActivar);
		}
	}
}
