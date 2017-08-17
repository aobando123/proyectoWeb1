//cambiar clave
function cambiarClave(arrPasswords){
	var request = $.ajax({
		url:'services/modificar_clave_usuario.php',
		dataType:'json',
		async:false,
		method:'Post',
		data:{
			'pgenerica': arrPasswords[0],
			'pcontrasenna': arrPasswords[1],
			'pid_usuario': sessionStorage.getItem('idUsuarioSS'),
		}

	});

	request.done(function () {
		sessionStorage.clear();
		window.location.href = "login.html";
	});
	
	request.fail(function() {
		console.log("Error de conexion");
	});
}