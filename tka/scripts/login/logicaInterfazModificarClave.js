var btnMoficarClave = document.querySelector("#btnModificarClave");
btnMoficarClave.addEventListener('click', modificarClave);
var errorPassword = document.querySelector("#errorPassword");
var errorPasswordRepetir = document.querySelector("#errorPasswordRepetir")
function obtenerDatos(){
  var arrPasswords = [];
  var generica = document.querySelector("#generica").value;
  var nuevaClave = document.querySelector("#password").value;
  var repetirClave =document.querySelector("#password-repetida").value;
  arrPasswords.push(generica,nuevaClave,repetirClave);
  return arrPasswords;
}
function validarClaves(arrPasswords){

  var valido = true;
  if(arrPasswords[1]===""){
    errorPassword.innerHTML="Por favor llene este campo"
    valido = false;
  }
  else if(!(arrPasswords[1].length >= 8)){
    errorPassword.innerHTML="La contraseña tiene que tener minimo 8 caracteres"
    valido = false;
  }

  if(arrPasswords[2]===""){
    errorPasswordRepetir.innerHTML = "Por favor confirme la contraseña"
    valido = false;
  }
  else if (arrPasswords[1]!==arrPasswords[2]){
    errorPassword.innerHTML="Las contraseñas no son las mismas";
    valido = false;
  }
  return valido;
}

function modificarClave(){
  var passwords = obtenerDatos();
  var cambioClave;
  if(validarClaves(passwords)){
    cambiarClave(passwords);
  }
}

function vaciarClaves(){
  document.querySelector("#generica").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#password-repetida").value = "";
}
