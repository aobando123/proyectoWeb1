var nombre = document.querySelector("#nombreUsuario");
nombre.innerHTML += JSON.parse(sessionStorage.getItem("nombreUsuarioSS"));
var cerrarSesion = document.querySelector("#cerrarSesion");
cerrarSesion.addEventListener('click', cerrarSesion);

function cerrarSesion() {
	sessionStorage.clear();
	// window.location.href = "index.html";
}