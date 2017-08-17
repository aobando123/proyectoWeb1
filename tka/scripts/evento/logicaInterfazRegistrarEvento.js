var botonRegistrar = document.querySelector("#btnRegistrar");

if(botonRegistrar!=null){
	botonRegistrar.addEventListener("click", validarFormulario);
}

llenarListaLugares();

//Función para validar que los campos requeridos del formulario estén insertados
function validarFormulario(event){
	var form = obtenerElementos();
	var valid = true;
	
	for (var i = 0; i < form.length; i++) {
		document.querySelector("label[for='" + form[i].id + "']").childNodes[1].textContent = "*";
		
		if (form[i].value === "" && form[i].className === "requerido"){
			valid = false;			
			document.querySelector("label[for='" + form[i].id + "']").childNodes[1].textContent = "* Campo requerido.";
		}
	}		
	
	valid = valid && validarFechas() && validarEspacio();
		
	if(valid){
		registrarDatos();
	}
	
	//Detiene la propagación del evento en caso de que el formulario no sea valido
	else{
		event.preventDefault();
        event.stopPropagation();
	}
}

function validarFechas(){    
	var fechaInicial = document.getElementById('fechaInicialEvento').value;
	var fechaFinal = document.getElementById('fechaFinalEvento').value;
    var actual = new Date();
	
    if (fechaInicial < actual || fechaInicial > fechaFinal){
		
		llamarAlerta(
			"error",
			"Error en los datos",
			"Las fechas no son correctas"
		);
		
		return false;
	}
	
    return true;    
}

function validarEspacio(){    	
	var lugarEvento = document.querySelector("#lugarEvento");
	var entradasDisponibles = document.querySelector("#entradasDisponibles");  
	
	var cantidadEntradasDisponibles = Number(entradasDisponibles.value);
	var capacidadLugar = Number(lugarEvento[lugarEvento.selectedIndex].getAttribute("data-espacio"));
	
	if(cantidadEntradasDisponibles > capacidadLugar || cantidadEntradasDisponibles < 0 ){
		llamarAlerta(
			"error",
			"Error en los datos",
			"La cantidad de entradas disponibles no es correcta"
		);
		
		return false;
	}		
	
	return true;
}

function obtenerValores(){
	var form = obtenerElementos();
	var arrFormulario = [];
	
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	
	return arrFormulario;
}

function obtenerElementos(){
	return document.querySelectorAll('form input:not([type="submit"]), form select ');
}

function registrarDatos (){
	var bActivo = true;
	var arrDatos = obtenerValores();

	arrDatos.push(bActivo);
	agregarItem(arrDatos);
	
	llamarAlerta("success",
		"Evento actualizado",
		"Los datos han sido actualizados satisfactoriamente"
	);
	
	window.location.href = "modificarEvento.html?id=" + arrDatos[0];
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

function llenarListaLugares(){
	var listaLugar = document.querySelector("#lugarEvento");
	var lugares = obtenerLugares();
	
	for(var i = 0; i < lugares.length; i++) {
		var opt = lugares[i][1];
		var el = document.createElement("option");
		
		el.textContent = opt;
		el.value = opt;
		el.id = lugares[i][0];
		el.setAttribute("data-espacio", lugares[i][5]);
		listaLugar.appendChild(el);
	}
}
