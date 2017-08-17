var btnAgregarEstudiante = document.querySelector("#btnAgregarEstudiante");
if(btnAgregarEstudiante != null){
	btnAgregarEstudiante.addEventListener("click", agregarEstudiante);
}

llenarListaEstudiantes();
listarEstudiantesEvento();

function llenarListaEstudiantes(){
	var listaEstudiantes = document.querySelector("#nombreEstudiante");
	listaEstudiantes.innerHTML = "";
	var estudiantes = obtenerEstudiantes();
	
	for(var i = 0; i <= estudiantes.length-1; i++) {
		var opt = estudiantes[i]["nombre"] + " " + estudiantes[i]["primer_apellido"]+
		" "+estudiantes[i]["segundo_apellido"]+ " "+"( Academia: "+estudiantes[i]["nombreAcademia"]+" )";
		var el = document.createElement("option");
		
		el.textContent = opt;
		el.value = estudiantes[i]["idUsuario"];
		el.id = estudiantes[i]["idCategoria_Evento"];
		listaEstudiantes.appendChild(el);
	}
}

function agregarEstudiante(){
	var idEvento = obtenerId();
	var estudiante = document.querySelector("#nombreEstudiante");
	var categoria_evento = estudiante[estudiante.selectedIndex].id;
	var nombreEstudiante = estudiante.value;	
	event.preventDefault();
	event.stopPropagation();
	guardarEstudiantesPorEvento(Number(categoria_evento),Number(estudiante.value));
	

	
}

function listarEstudiantesEvento() {
	var lista = obtenerEstudiantesPorEvento();
	var td, texto, fila, activo, input,p;
	var tbody = document.querySelector("#tablaEstudiantesEvento tbody");

	tbody.innerHTML ="";
	
	if(lista != []){
		
		for (var i = 0; i < lista.length; i++) {
			   activo = lista[i]["descalificado"] === "1" ? "calificado" : "descalificado";
				document.querySelector("#tablaEstudiantesEvento").style.display = "";
				fila = tbody.insertRow(i);
								
				td = fila.insertCell();
				texto = document.createTextNode(lista[i]["nombre"]+" "+
					lista[i]["primer_apellido"]+" "+lista[i]["segundo_apellido"]);
				td.appendChild(texto);
				td = fila.insertCell();
				texto = document.createTextNode(lista[i]["categoriaPeso"]+" "+
					lista[i]["genero"]+" "+lista[i]["categoriaEdad"]);
				td.appendChild(texto);
				td.id = lista[i]["categoriaPeso"]
				
				
				td = fila.insertCell();
				texto = document.createTextNode(lista[i]["peso"]);
				td.appendChild(texto);

				td = fila.insertCell();
				p = document.createElement('p');

				p.innerHTML = lista[i]["peso_repesaje"];
				input = document.createElement('input');
				input.classList = "display-none"
				input.value = p.innerHTML;
				input.type ="number";
				td.appendChild(p);
				td.appendChild(input);

				td = fila.insertCell();
				texto = document.createTextNode(activo);
				td.appendChild(texto);

				td =  fila.insertCell();
				var btnEliminar = document.createElement('button');

				btnEliminar.type = "button";
				btnEliminar.value = "Eliminar";
				btnEliminar.name =  lista[i]["idUsuario"];
				btnEliminar.classList="btn btnDelete fa fa-trash";
				btnEliminar.addEventListener("click", eliminarEstudiantedeEvento);

				td.appendChild(btnEliminar);

				var btnRepeso = document.createElement('button');

				btnRepeso.type = "button";
				btnRepeso.value = "Eliminar";
				btnRepeso.name =  lista[i]["idUsuario"];
				btnRepeso.classList="btn btnDelete fa fa-pencil display-block";
				btnRepeso.addEventListener("click", modificarRepeso);

				td.appendChild(btnRepeso);
				var btnGuardar = document.createElement('button');

				btnGuardar.type = "button";
				btnGuardar.value = "Eliminar";
				btnGuardar.name =  lista[i]["idUsuario"];
				btnGuardar.id = lista[i]["Categoria_Evento"];
				btnGuardar.classList="btn btnDelete fa fa-floppy-o display-none";
				btnGuardar.addEventListener("click", guardarRepeso);

				td.appendChild(btnGuardar);
			
		}
	}
}

function eliminarEstudiantedeEvento (){
	var estudiante  = event.currentTarget.name;
 	var evento = obtenerId();
 elimEstudiantedeEvento(evento,estudiante);


} 

function modificarRepeso() {
	var row = event.currentTarget.parentNode.parentNode;
	var td = row.children[3];
	var btnEditar = event.currentTarget;
	var btnGuardar = event.currentTarget.parentNode.children[2];
	td.children[0].classList = "display-none";
	td.children[1].classList = "display-block";
	btnGuardar.classList = "btn btnDelete fa fa-floppy-o display-block";
	btnEditar.classList = "btn btnDelete fa fa-pencil display-none";
}
function guardarRepeso() {
	var row = event.currentTarget.parentNode.parentNode;
	var td = row.children[3];
	var btnGuardar = event.currentTarget;
	var btnEditar = event.currentTarget.parentNode.children[1];
	var valor_repesaje =td.children[1].value;
	var categoria_peso =  row.children[1].id
	var calificado;

	if (valor_repesaje === "") {
		td.children[1].placeholder = "digite un numero";
	}else{
	td.children[1].classList = "display-none";
	td.children[0].classList = "display-block";
	td.children[0].innerHTML = td.children[1].value;
	btnGuardar.classList = "btn btnDelete fa fa-floppy-o display-none";
	btnEditar.classList = "btn btnDelete fa fa-pencil display-block";
	calificado = esta_calificado(categoria_peso, td.children[1].value);
	ingresarRepesaje(td.children[1].value, calificado, btnGuardar.name, btnGuardar.id);
	}

}
function esta_calificado(categoriaPeso, peso) {
	var calificado = 0;
	switch(categoriaPeso){
		case 'pluma':
			if (peso < 51) {
				calificado = 1
			}
			break;
		case 'gallo':
			if (peso>51 && peso<60) {
				calificado = 1;
			}
			break;
		case 'supergallo':
			if (peso>59 && peso<66) {
				calificado = 1;
			}
			break;
		case 'welter':
			if (peso>65 && peso<75) {
				calificado = 1;
			}
			break;
		case 'pesado':
		if (peso>74) {
			calificado = 1;
		}
			break;

	}

	return calificado;
}