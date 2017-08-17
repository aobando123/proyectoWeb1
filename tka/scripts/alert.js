var alerta = document.querySelector(".alert");

function llamarAlerta(tipo,titulo,mensaje){
    var claseCSS = " alert-"+tipo;

    alerta.className = "alert fade-out display-none" + claseCSS;
    alerta.children[2].innerHTML= titulo;//h3
    alerta.children[3].innerHTML = mensaje;//p
    alerta.children[0].addEventListener("click", cerrar);
    abrir();


}

function cerrar(){
    alerta.className = alerta.className.replace("fade-in","fade-out");
    setTimeout(function(){alerta.className = alerta.className.replace("display-block","display-none"); }, 400);
}
function abrir(){
    alerta.className = alerta.className.replace("fade-out","fade-in");
    setTimeout(agregarAlerta(), 600);
}


function agregarAlerta(){
  alerta.className = alerta.className.replace("display-none","display-block");
}
