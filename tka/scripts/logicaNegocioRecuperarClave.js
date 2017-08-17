function buscarCorreo(email){
  var usuarios = obtenerUsuarios();
  var claveGenerica ='';
  for (var i = 0; i < usuarios.length; i++) {
      if(usuarios[i][2]===email){
        claveGenerica = Math.random().toString(36).slice(-8);
        usuarios[i][3] = claveGenerica;
        guardarUsuario(usuarios);
        //se envia la clave por correo
          return true;
      }
  }
  return false;
}

function guardarCorreo(email){
  localStorage.setItem("cacheEmail", JSON.stringify(email));
}
