var nombre = document.querySelector("#nombreUsuario");
nombre.innerHTML += JSON.parse(sessionStorage.getItem("nombreUsuarioSS"));
var sesion = document.querySelector("#cerrarSesion");
var tipo_Usuario =  JSON.parse(sessionStorage.getItem("tipoUsuarioSS"));
if(tipo_Usuario===null){
	//window.location.href="index.html"
}
sesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {
	sessionStorage.clear();
	window.location.href = "index.html";
}
