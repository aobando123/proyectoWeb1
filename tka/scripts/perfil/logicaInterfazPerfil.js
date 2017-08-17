
var perfil = document.querySelector("#perfil");
var correo = document.querySelector("#correo");
var nombre = document.querySelector("#nombre");
var editar  = document.querySelector("#editar")
var actualizar = document.querySelector("#actualizar")
editar.addEventListener("click", editarCampos);
actualizar.addEventListener("click", actualizarCampos);
llenarDatos();
function llenarDatos(){
  var usuario = obtenerUsuario();
  perfil.children[0].src=usuario[1];
  correo.children[0].innerText = usuario[3];
  nombre.children[0].innerHTML = usuario[2];

}

function editarCampos(){
  perfil.children[1].classList= "display-block";
  correo.children[1].classList= "display-block";
  correo.children[0].classList = "display-none";
  nombre.children[1].classList= "display-block";
  nombre.children[0].classList = "display-none";

  correo.children[1].value = correo.children[0].innerText;
  nombre.children[1].value = nombre.children[0].innerText;

  editar.classList="btn btnRegistrar display-none";
  actualizar.classList="btn btnRegistrar display-block";
}

function actualizarCampos(){
  inputs = document.querySelectorAll("input");
  if(validarCampos(inputs)){
    var datos =  obtenerDatos(inputs);
    if(inputs[0].value===""){
      modificarUsuario(datos);

    }
    else{
      convertirImagen(datos,"modificar")
    }
  }

  cambiarBotones();
  llenarDatos();
  llamarAlerta("success", "Se ha modificado su perfil", "datos modificados existosamente");


}

function obtenerDatos(campos){
    var datos = [];
    var idUsuario = JSON.parse(sessionStorage.getItem("idUsuarioSS"));
  for (var i = 0; i < campos.length; i++) {
      if(campos[i].type === "file"){
        datos[i] =  campos[i].files[0]
      }
      else{
        datos[i] = campos[i].value;
      }
  }
  datos.unshift(idUsuario);
  datos.push(true);
  return datos;
}

function validarCampos(campos){
  var valido = true;

  for (var i = 0; i < campos.length; i++) {
    if(campos[i].value ==="" && i!==0){
      valido = false;
      break;
    }

  }
  return valido
}

function  cambiarBotones(){
  perfil.children[1].classList= "display-none";
  correo.children[0].classList= "display-block";
  correo.children[1].classList = "display-none";
  nombre.children[0].classList= "display-block";
  nombre.children[1].classList = "display-none";

  editar.classList="btn btnRegistrar display-block";
  actualizar.classList="btn btnRegistrar display-none";
}
