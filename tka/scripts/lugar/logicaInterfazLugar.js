/*************************************************************************************************************
*											  Template														 *
**************************************************************************************************************
*	COSAS SE MOFICAN DE ESTE TEMPLATE:
*		~Los id (#) que se usan en los query selectors
*		~La palabra Lugar por la parte que esten trabajando usar ctrl+h para remplazar
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

var desactivarDomingo = document.querySelector(".day .desactivardomingo");
var desactivarLunes = document.querySelector(".day .desactivarlunes");
var desactivarMartes = document.querySelector(".day .desactivarmartes");
var desactivarMiercoles = document.querySelector(".day .desactivarmiercoles");
var desactivarJueves = document.querySelector(".day .desactivarjueves");
var desactivarViernes = document.querySelector(".day .desactivarviernes");
var desactivarSabado = document.querySelector(".day .desactivarsabado");

var longitud;
var latitud;
var bounds;
var mapa;
var marker;

//llenarHorario();
botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);

botonAgregar.addEventListener("click", llamarModal);

desactivarDomingo.addEventListener("click", desactivarDia);
desactivarDomingo.dia = "domingo";

desactivarLunes.addEventListener("click", desactivarDia);
desactivarLunes.dia = "lunes";

desactivarMartes.addEventListener("click", desactivarDia);
desactivarMartes.dia = "martes";

desactivarMiercoles.addEventListener("click", desactivarDia);
desactivarMiercoles.dia = "miercoles";

desactivarJueves.addEventListener("click", desactivarDia);
desactivarJueves.dia = "jueves";

desactivarViernes.addEventListener("click", desactivarDia);
desactivarViernes.dia = "viernes";

desactivarSabado.addEventListener("click", desactivarDia);
desactivarSabado.dia = "sabado";

//desactivarDía
function desactivarDia(pdia) {
	var dia = pdia.target.dia;
	
	if(document.querySelector(".desactivar"+dia).checked){
		document.getElementById(dia+"Open").disabled = true;
		document.getElementById(dia+"Close").disabled = true;
		}else{
			document.getElementById(dia+"Open").disabled = false;
			document.getElementById(dia+"Close").disabled = false;
			}
}


// Hacer filtro
var table = document.querySelector("#tblLugares").tBodies[0];

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

function initMap(){
	 mapa = new google.maps.Map(document.getElementById('map'), {
           center: {lat: 9.953207, lng: -84.127891},
           scrollwheel: true,
           zoom: 12
         });
				var ltlg = mapa.getCenter();
				 map = mapa;
				 bounds = ltlg;
		 marker = new google.maps.Marker({
					 position: ltlg,
					 map: mapa
				 });
	 latitud = marker.getPosition().lat();
	 longitud = marker.getPosition().lng();
				 mapa.addListener('click', function(e) {

			     placeMarkerAndPanTo(e.latLng, mapa, marker, false);
			   });
}
function placeMarkerAndPanTo(latLng, mapa, marker, reset) {
	marker.setPosition(latLng);
    mapa.panTo(latLng);
	
	if(reset){
			mapa.setZoom(12);
	}
	latitud = marker.getPosition().lat();
	longitud = marker.getPosition().lng();
}


llenarTabla();

function llamarModal() {
	limpiarFormulario();
	window.location.href = "#modal";
	titulo.innerHTML = "Registrar lugar"
	cambiarBotones("registrar", 0)
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
}

function obtenerDatos() {
	var form = document.querySelectorAll('form input:not([type="checkbox"])');
	var arrFormulario = [];
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	
	arrFormulario[i] = latitud;
	arrFormulario[i+1] = longitud;
	
	return arrFormulario;
}

function validarDatos(arrDatos) {
	var form = document.querySelectorAll('form input:not([type="button"]), form select ');
	var valido = true;
	var contSpan=0
	for (var i = 0; i < form.length; i++) {
		if (form[i].classList[0]==="requerido") {
			if(arrDatos[i]===0){
				span[contSpan].innerHTML =" Campo requerido";
				contSpan++
				valido = false;
			}
			else{
				span[contSpan].innerHTML ="*";
				contSpan++
			}
		}
	}
	return valido;
}

function registrarDatos () {
	var bActivo = "activo";
	var arrDatos = obtenerDatos();

	if(validarDatos(arrDatos)){
		arrDatos.push(bActivo);
		document.querySelector(".remodal-overlay").style.display = "none";
		agregarLugar(arrDatos);
		llenarTabla();
		window.location.hash='';
		limpiarFormulario();
		llamarAlerta("success",
			"Lugar registrado",
			"Los datos han sido registrados satisfactoriamente"
		);
	}
}

function actualizarDatos()
{
	var arrDatos = obtenerDatos();
	arrDatos.unshift(Number (botonActualizar.name));

	modificarLugar(arrDatos);
	
	limpiarFormulario();
	cambiarBotones("agregar");
	window.location.hash='';
	llenarTabla();
	llamarAlerta("success",
		"Lugar actualizado",
		"Los datos han sido actualizados satisfactoriamente"
	);

}
function activarDesactivarBoton(){
	var activo = this.value === "Activar" ? true : false;
	var mensajeActivo="activado";
	desactivarActivarLugar(Number(this.name), activo);
	if(activo){
		mensajeActivo = "activado";
	}
	else{
		mensajeActivo="desactivado";
	}
	llamarAlerta("warning",
	"Lugar "+ mensajeActivo,
	"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente");
}




function llenarFormulario() {
	cambiarBotones("actualizar", this.name);
	document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar lugar"


	var infoLugar = buscarLugarCodigo(this.name);
	
	/*new google.maps.LatLng(infoLugar['latitud'], infoLugar['longitud']);*/
	var latlng = new google.maps.LatLng(infoLugar['latitud'], infoLugar['longitud']);
	placeMarkerAndPanTo(latlng,mapa,marker,false)
	
	document.querySelector("#txtLugar").value = infoLugar['nombre'];//cuando se traten de select poner 1
	document.querySelector("#txtDireccion").value = infoLugar['ubicacion']
	document.querySelector("#txtTelefono").value = infoLugar['telefono'];
	document.querySelector("#numCapacidad").value = infoLugar['capacidad'];
	
	var infoHorario = obtenerHorarioLugares(this.name);
	
	
	for(var k = 0; k<7; k++){
		
		switch(k){
			case 0:
			var dia = "domingo";
			break;
			case 1:
			var dia = "lunes";
			break;
			case 2:
			var dia = "martes";
			break;
			case 3:
			var dia = "miercoles";
			break;
			case 4:
			var dia = "jueves";
			break;
			case 5:
			var dia = "viernes";
			break;
			case 6:
			var dia = "sabado";
			break;
			}
			
			for (var m = 1; m < 3; m++) {
				
						switch(m) {
						case 1:
						var dato = "inicio";
						document.querySelector("#"+dia+"Open").value = infoHorario[k][dato];
						break;
						case 2:
						var dato = "cierre";
						document.querySelector("#"+dia+"Close").value = infoHorario[k][dato];
						break;
						default:
						}
						
						if(infoHorario[k][dato] == "cerrado"){
							document.querySelector(".desactivar"+dia).checked = true;
							}
						
						if(document.querySelector(".desactivar"+dia).checked){
						document.getElementById(dia+"Open").disabled = true;
						document.getElementById(dia+"Close").disabled = true;
						}else{
						document.getElementById(dia+"Open").disabled = false;
						document.getElementById(dia+"Close").disabled = false;
						}
						
						}
			
		}
		
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
	document.querySelector("#txtLugar").value = "";//cuando se traten de select poner 1
	document.querySelector("#txtDireccion").value = "";
	document.querySelector("#txtTelefono").value = "";
	document.querySelector("#numCapacidad").value = "";
	placeMarkerAndPanTo(bounds, mapa, marker, true);
	
	
	//checkboxs
		for (var i = close.length - 1; i >= 0; i--) {
		close[i].checked=false;
	}
	//
	for(var k = 0; k<7; k++){
		
		switch(k){
			case 0:
			var dia = "domingo";
			break;
			case 1:
			var dia = "lunes";
			break;
			case 2:
			var dia = "martes";
			break;
			case 3:
			var dia = "miercoles";
			break;
			case 4:
			var dia = "jueves";
			break;
			case 5:
			var dia = "viernes";
			break;
			case 6:
			var dia = "sabado";
			break;
			}
			
			document.querySelector("#"+dia+"Open").value = "";
			document.querySelector("#"+dia+"Close").value = "";
			document.querySelector(".desactivar"+dia).checked = false;
			document.getElementById(dia+"Open").disabled = false;
			document.getElementById(dia+"Close").disabled = false;
	}
	//
}

function llenarTabla() {
	var listaLugares = obtenerLugares();
	var td, text, fila;
	var info="";
	var campos = ["nombre","ubicacion","telefono","capacidad"]
	var tbody = document.querySelector("#tblLugares tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaLugares != null){
		for (var i = 0; i < listaLugares.length ; i++) {

			fila = tbody.insertRow(i);//fila
			
			for (var columna = 0; columna < Object.keys(listaLugares[i]).length -3 ; columna++) {
					td = fila.insertCell();
					td.classList= "center";
				if(columna === 4){
					
					idLugar = listaLugares[i]['idLugar'];
					var listaHorario = obtenerHorarioLugares(idLugar);
					
					var btnHorario = document.createElement('button');
					var horarioDiv = document.createElement('div');
					btnHorario.classList = "btn btnRegistrar centericon"
					horarioDiv.classList = "display-none"
					btnHorario.addEventListener("click", mostrarHorario);
					btnHorario.name = "oculto";
					btnHorario.innerHTML = 'Horario <i class="fa fa-caret-down" aria-hidden="true"></i>';
					
					var dias = listaHorario;
					for (var k = 0; k < dias.length; k++) {
						
						switch(k) {
						case 0:
						var dia = "Domingo";	
						break;
						case 1:
						var dia = "Lunes";
						break;
						case 2:
						var dia = "Martes";
						break;
						case 3:
						var dia = "Miercoles";
						break;
						case 4:
						var dia = "Jueves";
						break;
						case 5:
						var dia = "Viernes";
						break;
						case 6:
						var dia = "Sabado";
						break;
						default:
						}
						
						for (var m = 0; m < 3; m++) {
						switch(m) {
						case 0:
						var dato = "dia_id_dia";	
						break;
						case 1:
						var dato = "inicio";
						break;
						case 2:
						var dato = "cierre";
						break;
						default:
						}
							if(m == 0){
								info += dia+'<br>';
								}else{
									
									if(m == 1 && dias[k][dato] == "cerrado"){
										info += dias[k][dato]+' ';
										}else if(m == 2 && dias[k][dato] == "cerrado"){
											break;
											}else{
												info += dias[k][dato]+' ';
												}
									
									}
						}
						horarioDiv.innerHTML += info+'<br><br>';
						info='';
					}
					
					td.appendChild(btnHorario);
					td.appendChild(horarioDiv);

				} else{
					text = document.createTextNode(listaLugares[i][campos[columna]]);
					td.appendChild(text);
				}

			}


			var td = fila.insertCell(listaLugares[i].length);
			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var activo = listaLugares[i]['estado'] === "desactivo" ? "Activar" : "Desactivar";
			var claseOjo = listaLugares[i]['estado'] === "desactivo" ? "fa-eye" : "fa-eye-slash";
			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaLugares[i]['idLugar'];
			btnEditar.classList="btn btnIcono fa fa-pencil";
			btnEditar.addEventListener("click", llenarFormulario);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaLugares[i]['idLugar'];
			btnActivar.classList="btn btnIcono fa "+ claseOjo;
			btnActivar.addEventListener("click", activarDesactivarBoton);

			td.appendChild(btnEditar);
			td.appendChild(btnActivar);
		}
	}
	}
	
function mostrarHorario(){
	if(this.name === "oculto"){
		this.parentNode.children[1].classList = "display-block";
		this.name = "revelado";
		this.innerHTML = 'Horario <i class="fa fa-caret-up" aria-hidden="true"></i>';
	}
	else{
		this.parentNode.children[1].classList = "display-none";
		this.name = "oculto";
		this.innerHTML = 'Horario <i class="fa fa-caret-down" aria-hidden="true"></i>';
	}
}
