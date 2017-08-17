var botonAgregarCategoria = document.querySelector("#btnAgregarCategoria");

if(botonAgregarCategoria!=null){
	botonAgregarCategoria.addEventListener("click", registrarDatosCategoria);
}

//Obtener Valores
function obtenerValoresCategoria(){
	var form = obtenerElementosCategoria();
	var arrFormulario = [];
	
	for (var i = 0; i < form.length; i++) {
		arrFormulario[i] = form[i].value || 0;
	}
	
	return arrFormulario;
}

//optener los elementos del form
function obtenerElementosCategoria(){
	return document.querySelectorAll('form#agregarCategoria input:not([type="submit"]), form#agregarCategoria select');
}

//Registrar Datos
function registrarDatosCategoria (){
		var arrDatos = obtenerValoresCategoria();
			var idEvento = obtenerId();
			agregarItemCategoria(Number(idEvento), arrDatos);
			

		
			
}



//TABS
function openTabs(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function eliminarCategoria(){
 var categoriaEvento  = event.currentTarget.name;
 
 elimCategoria(categoriaEvento);
}

listarCategoriasEvento();
// Función para listar Categorias del Evento
function listarCategoriasEvento() {
	var listaCategorias = obtenerlistaCategoriasPorEvento();
	var td, text, fila;
	var campos = ["categoriaPeso","categoriaEdad","Genero"];
	var tbody = document.querySelector("#tablaCategoriasEvento tbody");

	tbody.innerHTML ="";//limpia la tabla
	
	if(listaCategorias != null){
		
		var numero = 0;
		
		for (var i = 0; i < listaCategorias.length; i++) {

				document.querySelector("#tablaCategoriasEvento").style.display = "";
				
				fila = tbody.insertRow(i);//fila
			for (var columna = 0; columna < Object.keys(listaCategorias[i]).length -1 ; columna++) {
				td = fila.insertCell();
				text = document.createTextNode(listaCategorias[i][campos[columna]]);
				td.appendChild(text);
			}
			
			/*CODIGO PARA AGREGAR BOTONES */
			var td = fila.insertCell();
			var btnEliminar = document.createElement('button');

			btnEliminar.type = "button";
			btnEliminar.value = "Eliminar";
			btnEliminar.name =  listaCategorias[i]["idCategoria_Evento"];
			btnEliminar.classList="btn btnDelete fa fa-trash";
			btnEliminar.addEventListener("click", eliminarCategoria);

			td.appendChild(btnEliminar);
			
			
		}
		
	}
}