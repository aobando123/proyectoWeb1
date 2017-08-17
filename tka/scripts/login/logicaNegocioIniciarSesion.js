//Quitar esta funcion en el implementacion
    datosFicticios();
function datosFicticios(){
  var arrUsuario = JSON.parse(localStorage.getItem("listaUsuarioLS"));;
  if(arrUsuario === null){
    arrUsuario = [
      [1,"images/perfil.jpg","Adrian Obando","adrian@gmail.com","12345678","estudiante"],
      [2,"images/perfil.jpg","Roberto Rojas" ,"roberto@gmail.com","12345678","profesor"],
      [3,"images/perfil.jpg","Adrian Leiton", "admin@gmail.com","12345678","administrador"],
      [4,"images/perfil.jpg","Adrian Ramirez","asistente@gmail.com","12345678","asistente"]
    ];
    localStorage.setItem("listaUsuarioLS", JSON.stringify(arrUsuario));
  }


}
function obtenerUsuarios(){
  var usuarios = JSON.parse(localStorage.getItem("listaUsuarioLS"));
  return usuarios;
}

function login(arrDatos){
    //quitar este funcion
    var paginaRedirigida
    var arrUsuarios = [];
    arrUsuarios = obtenerUsuarios();

    for (var i = 0; i < arrUsuarios.length; i++) {
        if(arrUsuarios[i][3]===arrDatos[0] && arrUsuarios[i][4]==arrDatos[1]){
            sessionStorage.setItem("nombreUsuarioSS",JSON.stringify(arrUsuarios[i][2]));
           sessionStorage.setItem("tipoUsuarioSS",JSON.stringify(arrUsuarios[i][5]));
           sessionStorage.setItem("idUsuarioSS", JSON.stringify(arrUsuarios[i][0]));
           switch (arrUsuarios[i][5]) {
             case "administrador":
               localStorage.setItem("paginaActivaLS", JSON.stringify("ajustes"));

                 paginaRedirigida = "listarAdministradores.html"
               break;
              case "asistente":
               localStorage.setItem("paginaActivaLS", JSON.stringify("ajustes"));

                paginaRedirigida = "listarAsistentes.html"
                break;
              case "profesor":
               localStorage.setItem("paginaActivaLS", JSON.stringify("listarProfesores"));
                paginaRedirigida ="listarProfesores.html"
                break;
              case "estudiante":
              localStorage.setItem("paginaActivaLS", JSON.stringify("listarEstudiante"));

                paginaRedirigida ="listarEstudiante.html"
             default:

           }
            return paginaRedirigida;
        }
    }

    return "error";
}

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
