var btnInicarSesion = document.querySelector("#btnIniciarSesion");
var errorEmail = document.querySelector("#errorEmail");
var errorPassword = document.querySelector("#errorPassword");
btnInicarSesion.addEventListener('click', loguearse);

function validacion(login) {
	var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	var valido = true;

	if (!checkEmail.test(login[0])) {
		errorEmail.innerHTML ="Por favor digite un email valido";
		valido =false;
	}
	if(login[1]===""){
		errorPassword.innerHTML ="Por favor digite una contraseña";
		valido = false;
	}

	else if(!(login[1].length >=8)){
		errorPassword.innerHTML ="La contraseña debe tener un minimo de 8 caracteres";
		valido = false
	}

	return valido;
}

function obtenerDatos() {
	var email = document.querySelector("#email").value;
	var password = document.querySelector("#password").value;
	var datosLogin =[];
	datosLogin.push(email, password);

	return datosLogin;

}
function loguearse() {
	var arrLogin = obtenerDatos();
	var resultado;

	if (validacion(arrLogin)) {
			resultado = login(arrLogin);
			if(resultado ==="error"){
				llamarAlerta(
					"error",
					"¡Lo Sentimos!",
					"La contraseña o correo son incorrectos"
				);
				vaciarFormulario();
			}
			else{
				window.location.href = "sesion.html";//CAMBIAR
			}
	}

}

function vaciarFormulario(){
	var formulario = obtenerDatos();
	for (var i = 0; i < formulario.length; i++) {
		formulario[i].value="";
	}
}
