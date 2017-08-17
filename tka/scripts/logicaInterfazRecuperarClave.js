var btnRecuperar = document.querySelector("#btnRecuperarClave");
var errorEmail = document.querySelector("#errorEmail");
btnRecuperar.addEventListener('click', recuperarClave);

function recuperarClave(){
  var correoBuscado;
  var email = obtenerEmail();
  if(validarEmail(email)){
    correoBuscado = buscarCorreo(email);
    if(correoBuscado){
      guardarCorreo(email);
      llamarAlerta(
        "success",
        "¡El correo si esta registrado!",
        "se te ha enviado tu nueva contraseña a tu correo para cambiarla"
      );
      window.location.href = "modificarClave.html";
    }
    else{
      llamarAlerta(
        "error",
        "¡El correo no esta registrado!",
        "Lo sentimos por favor digite un correo registrado"
      );
      vaciarEmail();
      
    }
  }

}
function validarEmail(email){
  var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var valido = true;
  if (!checkEmail.test(email)) {
		errorEmail.innerHTML ="Por favor digite un email valido";
		valido =false;
	}
  return valido
}

function obtenerEmail() {
	var email =  document.querySelector("#email").value;

	return email;

}
function vaciarEmail(){
  document.querySelector("#email").value='';
}
