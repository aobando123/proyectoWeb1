//INICIAR SESION
function iniciarSesion(arrDatos){
	
  var req = $.ajax({
    url: 'services/iniciar_sesion.php',
    dataType: 'json',
    async:false,
    method: 'get',
    data:{
      'pcorreo_electronico' : arrDatos[0],
      'pcontrasenna': arrDatos[1]
    }
  });
  req.done( function( respuesta ) {
    if(respuesta == null){
      //console.log('Correo o contraseña incorrectos');
	  //return "error";
	  llamarAlerta(
					"error",
					"¡Lo Sentimos!",
					"La contraseña o correo son incorrectos"
				);
				vaciarFormulario();
		document.querySelector("#email").value = "";
		document.querySelector("#password").value = "";
    }else{
      var tipo_usuario = respuesta['tipo'];

      //sessionStorage.setItem('correo_activo', respuesta['correo']);
      //sessionStorage.setItem('tipo_usuario_activo', tipo_usuario );
		sessionStorage.setItem("nombreUsuarioSS", respuesta['nombre']);
		sessionStorage.setItem("tipoUsuarioSS", tipo_usuario);
		sessionStorage.setItem("idUsuarioSS", respuesta['idUsuario']);
		sessionStorage.setItem("correoUsuarioSS", respuesta['correo']);

      switch (tipo_usuario) {
        case 'administrador':
            location.href = 'listarAdministradores.html';
        break;
        case 'asistente':
            location.href = 'listarAsistentes.html';
        break;
        default:

        break;
      }

    }


  });
  req.fail(function() {

    console.log('error')
  });
	}
// END LOGIN
