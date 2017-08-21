var btnRecuperar = document.querySelector("#btnRecuperarClave");
var errorEmail = document.querySelector("#errorEmail");
btnRecuperar.addEventListener('click', recuperarClave);

function recuperarClave(){
  var email = obtenerEmail();
  if(validarEmail(email)){
	  
	var correoBuscado = buscarCorreo(email);
	
	if(correoBuscado != null){
		
		llamarAlerta(
		"success",
		"¡El correo si esta registrado!",
		"se te ha enviado tu contraseña a tu correo electrónico"
		);
		
		}else{
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
