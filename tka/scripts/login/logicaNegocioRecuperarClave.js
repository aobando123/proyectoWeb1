function buscarCorreo(email){
	var correo;
	
	var request = $.ajax({
		url:'services/buscar_correo_usuario.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pcorreo': email,
		}

	});

	request.done(function (datos) {
	correo = datos;
	});
	
	request.fail(function() {
		console.log("Error de conexion");
	});
	
	return correo;
	}



