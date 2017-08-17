function obtenerlistaInvitadosPorEvento() {
	var listaInvitados= [];
	var request = $.ajax({
		url:'services/evento/invitado_especial/listar_invitado_especial.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':obtenerId(),
		}
	});
		request.done(function (datos) {
		listaInvitados = datos;
	});
		return listaInvitados;
}

function agregarItemInvitado(pidEvento, pInvitado) {
	var request = $.ajax({
		url:'services/evento/invitado_especial/agregar_invitado_especial.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pEvento':pidEvento,
			'pnombre': pInvitado[0],
			'pcorreo': pInvitado[1],
			'ptelefono': pInvitado[2],
		}
	});
	request.done(function () {
		llamarAlerta("success","Invitado registrado correctamente","");
		listarInvitadosEvento();
	});
	request.fail(function () {
		console.log("fail")	
	})

}

function elimInvitado(invitado) {
		var request = $.ajax({
		url:'services/evento/invitado_especial/eliminar_invitado_especial.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pInvitado':invitado,
		}
	});
	request.done(function () {
		llamarAlerta("success","Invitado elminado correctamente","");
		listarInvitadosEvento();
	});
	request.fail(function () {
		console.log("fail")	
	});
}