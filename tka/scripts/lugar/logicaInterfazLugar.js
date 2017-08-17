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
var longitud;
var latitud;
var bounds;
var mapa;
var marker;

llenarHorario();
botonRegistrar.addEventListener("click", registrarDatos);
botonActualizar.addEventListener("click", actualizarDatos);

botonAgregar.addEventListener("click", llamarModal);

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
           scrollwheel: false,
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
	latitud =marker.getPosition().lat();
	longitud = marker.getPosition().lng();
	marker.setPosition(latLng);
  mapa.panTo(latLng);
	if(reset){
			mapa.setZoom(12);
	}
}





function llenarHorario() {
	var dias = document.querySelectorAll(".day")
	for (var i = 0; i < dias.length; i++) {
		var day = dias[i].id;
		dias[i].innerHTML +='<div id="label">' + day + ': </div>';
		dias[i].innerHTML += '<select id="' + day + 'FromH" class="select hour from"></select>';
		dias[i].innerHTML+='<select id="' + day + 'FromM" class="select min from"></select>';
		dias[i].innerHTML+='<select id="' + day + 'FromAP" class= "select ampm from"></select>';
		dias[i].innerHTML+=' a <select id="' + day + 'ToH" class="select hour to"></select>';
		dias[i].innerHTML+='<select id="' + day + 'ToM" class="select min to"></select>';
		dias[i].innerHTML+='<select id="' + day + 'ToAP" class="select ampm to"></select>';
		dias[i].innerHTML+='<input type="checkbox" name="closed" class="closed"><span>Cerrado</span>';
	}
	llenarSelect();


}
function disableDay() {
		var padre = this.parentNode.childNodes;
		for (var i = padre.length - 1; i >= 0; i--) {
			if(padre[i].classList && padre[i].classList[0]==="select"){
				if(this.checked){
					padre[i].disabled = true;
				}
				else{
					padre[i].disabled = false;
				}
			}
		}


}
function llenarSelect(){
	var horas = document.querySelectorAll(".hour");
	var min = document.querySelectorAll(".min");
	var m = ["00","15","30","45"];
	var ampm = document.querySelectorAll(".ampm");
	var close = document.querySelectorAll(".day .closed");

	//HORAS
	for (var i = 0; i < horas.length; i++) {
	 	for (var h = 0; h < 13; h++) {
	 		horas[i].innerHTML +='<option value="' + h + '">' + h + '</option>';
	 	}
	 	horas[i].value="7";
	}
	//MINUTOS
	for (var i = 0; i < min.length; i++) {
		for (var j = 0; j < m.length; j++) {
			min[i].innerHTML+='<option value="' + m[j] + '">' + m[j] + '</option>'
		}
	}

	//AM PM
	for (var i = 0; i < ampm.length; i++) {
		ampm[i].innerHTML+='<option value="AM">AM</option>';
		ampm[i].innerHTML+='<option value="PM">PM</option>';
		if(ampm[i].classList[2]==="to"){
			ampm[i].value='PM'		}

	}
	//Desactivar
	for (var i = close.length - 1; i >= 0; i--) {
		close[i].addEventListener("click", disableDay);
	}

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
	var form = document.querySelectorAll('form input:not([type="checkbox"]), form select ');
	var arrFormulario = [];
	var contFormulario =0;
	var horario=[];
	var arrhorario=[];
	var contdias=0;
	var dias=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"]
	var cont =0;
	for (var i = 0; i < form.length; i++) {

		if(form[i].classList[0]==="select" && !(form[i].parentNode.children[7].checked)){
				if(cont===0){
					horario[cont]= form[i].parentNode.children[0].innerText;
					contdias++;
					cont++;
				}

				horario[cont] = form[i].value;
				if (cont===1 || cont===6) {
					cont++
					horario[cont]=":";

				}else if(cont===4){
					cont++
					horario[cont]=" a "
				}
				cont++;
				if(cont===10){

					horario[cont]="\n";
					arrhorario.push(horario);
					horario=[];
					cont=0;
				}

		}
		else{
			if(contFormulario===4){
					arrFormulario[contFormulario] = arrhorario;
					contFormulario++;
					if(form[i].id === "numLongitud"){
						arrFormulario[contFormulario] = form[i].value||0;
					contFormulario++;
					}

			}
			else if(form[i].disabled===false && form[i]!==null){
				arrFormulario[contFormulario] = form[i].value || 0;
				contFormulario++;
			}


		}

	}
	arrFormulario[contFormulario] = latitud;
	arrFormulario[contFormulario+1] = longitud;
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
	var bActivo = true;
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
	var bActivo = true;
	var arrDatos = obtenerDatos();
	arrDatos.push(bActivo);
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
	llenarTabla();
	llamarAlerta("warning",
		"Lugar "+ mensajeActivo,
		"Los datos han sido "+ mensajeActivo+  "s satisfactoriamente"
	);
}




function llenarFormulario() {
	cambiarBotones("actualizar", this.name);
		document.querySelector(".remodal-close").addEventListener("click", limpiarFormulario);
	window.location.href = "#modal";
	titulo.innerHTML = "Modificar lugar"


	var infoLugar =buscarLugarCodigo(this.name);
	var horarioLugar = infoLugar[5];
	var contHorarioLugar = infoLugar[5].length-1;
	 var latlng = new google.maps.LatLng(infoLugar[6], infoLugar[7]);
	 placeMarkerAndPanTo(latlng,mapa,marker,false)
	document.querySelector("#txtLugar").value = infoLugar[1];//cuando se traten de select poner 1
	document.querySelector("#txtDireccion").value = infoLugar[2]
	document.querySelector("#txtTelefono").value = infoLugar[3];
	document.querySelector("#numCapacidad").value = infoLugar[4];



	var horario = document.querySelectorAll("#hourForm .day");
	var close = document.querySelectorAll(".day .closed");
	var cont = 0
	var pm = true;
	//horario
	for (var i = horario.length - 1; i >= 0; i--) {
		var select = horario[i].childNodes
		var dia = horarioLugar[contHorarioLugar][0] + " ";
		for (var j = select.length - 1; j >= 0; j--) {
			if(select[j].classList && select[j].classList[0]==="select" && select[0].innerText === dia ){
				switch(cont){
					case 0:
						if(pm){
							select[j].value=horarioLugar[contHorarioLugar][9];
						}
						else{
							select[j].value=horarioLugar[contHorarioLugar][4];
						}
						cont++
						break;
					case 1:
						if(pm){
							select[j].value=horarioLugar[contHorarioLugar][8];
						}
						else{
							select[j].value=horarioLugar[contHorarioLugar][3];
						}
						cont++
						break;
					case 2:
					if (pm) {
						select[j].value=horarioLugar[contHorarioLugar][6];
						pm=false;
					}
					else{
						select[j].value=horarioLugar[contHorarioLugar][1];
						pm=true;
					}

						cont=0;
						break;
				}
				select[j].disabled=false;
			} else if(select[j].classList && select[j].classList[0]==="select"){
				select[j].disabled=true
			}
		}
		if(select[0].innerHTML === dia && contHorarioLugar>=0){
			close[i].checked=false;
			contHorarioLugar--;
		}else{
			close[i].checked=true;
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
	var horario = document.querySelectorAll("#hourForm .day");
	var close = document.querySelectorAll(".day .closed");
	var cont = 0
	var pm = true;
	//horario
	for (var i = horario.length - 1; i >= 0; i--) {
		var select = horario[i].childNodes
		for (var j = select.length - 1; j >= 0; j--) {
			if(select[j].classList && select[j].classList[0]==="select"){
				switch(cont){
					case 0:
						if(pm){
							select[j].value="PM";
							pm = false;
						}
						else{
							select[j].value="AM";
							pm=true;
						}
						cont++
						break;
					case 1:
						select[j].value="00"
						cont++
						break;
					case 2:
						select[j].value="7";
						cont=0;
						break;
				}
			}
			select[j].disabled=false;
		}

	}
	//checkboxs
		for (var i = close.length - 1; i >= 0; i--) {
		close[i].checked=false;
	}
}

function llenarTabla() {
	var listaLugares = obtenerListaLugares();
	var td, text, fila;
	var info="";

	var tbody = document.querySelector("#tblLugares tbody");

	tbody.innerHTML ='';//limpia la tabla

	if(listaLugares != null){
		for (var i = 0; i < listaLugares.length ; i++) {

			fila = tbody.insertRow(i);//fila

			for (var columna = 1; columna < listaLugares[i].length -3 ; columna++) {
				td = fila.insertCell(columna-1);
				if(columna===5){
					var btnHorario = document.createElement('button');
					var horarioDiv = document.createElement('div');
					btnHorario.classList = "btn btnRegistrar centericon"
					horarioDiv.classList = "display-none"
					btnHorario.addEventListener("click", mostrarHorario);
					btnHorario.name = "oculto";
					btnHorario.innerHTML = 'Horario <i class="fa fa-caret-down" aria-hidden="true"></i>';
					var dias = listaLugares[i][5];
					for (var k = 0; k < dias.length; k++) {
						for (var m = 0; m < dias[k].length; m++) {
							info += dias[k][m];
						}
						horarioDiv.innerHTML += '<p>'+info+'</p>';
						info='';
					}

					td.appendChild(btnHorario);
					td.appendChild(horarioDiv);
				}
				else{

				text = document.createTextNode(listaLugares[i][columna]);
				td.appendChild(text);
				}

			}


			var td = fila.insertCell(listaLugares[i].length -4);
			var btnEditar = document.createElement('button');
			var btnActivar = document.createElement('button');
			var activo = listaLugares[i][listaLugares[i].length-1] === false ? "Activar" : "Desactivar";
			var claseOjo = listaLugares[i][listaLugares[i].length-1] === false ? "fa-eye" : "fa-eye-slash";
			btnEditar.type = "button";
			btnEditar.value = "Editar";
			btnEditar.name =  listaLugares[i][0];
			btnEditar.classList="btn btnIcono fa fa-pencil";
			btnEditar.addEventListener("click", llenarFormulario);

			btnActivar.type = "button";
			btnActivar.value = activo;
			btnActivar.name = listaLugares[i][0];
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
