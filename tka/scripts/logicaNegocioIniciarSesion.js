//Quitar esta funcion en el implementacion

function datosFicticios(){
  var arrUsuario = JSON.parse(localStorage.getItem("listaUsuarioLS"));;
  if(arrUsuario === null){
    arrUsuario = [
      [1,"Adrian Obando","adrian@gmail.com","12345678","estudiante"],
      [2,"Roberto Rojas" ,"roberto@gmail.com","12345678","profesor"],
      [3,"Adrian Leiton", "admin@gmail.com","12345678","administrador"],
      [4,"Adrian Ramirez","asistente@gmail.com","12345678","asistente"]
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
    datosFicticios();
    var paginaRedirigida
    var arrUsuarios = [];
    arrUsuarios = obtenerUsuarios();

    for (var i = 0; i < arrUsuarios.length; i++) {
        if(arrUsuarios[i][2]===arrDatos[0] && arrUsuarios[i][3]==arrDatos[1]){
            sessionStorage.setItem("nombreUsuarioSS",JSON.stringify(arrUsuarios[i][1]));
            paginaRedirigida = arrUsuarios[i][3]+".html";
            return paginaRedirigida;
        }
    }

    return "error";
}

function guardarUsuario(arrUsuarios){
    localStorage.setItem("listaUsuarioLS", JSON.stringify(arrUsuarios));
}
