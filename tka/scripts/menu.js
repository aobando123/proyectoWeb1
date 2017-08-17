//deje lo que esta dentro de mainav vacio
  var li = []
  var inicio = true

determinarMenu();
agregarEventListener();
setActive();
function determinarMenu() {
  var tipoUsuario = JSON.parse(sessionStorage.getItem("tipoUsuarioSS"));
  var menu = document.querySelector("#mainav");
  switch ("administrador") {
    case "administrador":
        menu.innerHTML = '<ul class="clear">'+
    '<li id="eventos"><a href="listarEventos.html">Eventos</a></li>'+
    '<li id="estudiantes"><a href="listarEstudiante.html">Estudiantes</a></li>'+
    '<li id="lugares" class="active"><a href="listarLugares.html">Lugares</a></li>'+
    '<li id="academias"><a href="listarAcademias.html">Academias</a></li>'+
      '<li id="organizaciones"><a href="listarOrganizaciones.html">Organizaciones</a></li>'+
    '<li id="listaProfesores"><a href="listarProfesores.html">Profesores</a></li>'+
    '<li id="patrocinadores"><a href="listarPatrocinadores.html">Patrocinadores</a></li>'+
    '<li id="ajustes"><a class="drop" href="#">Ajustes</a>'+
          '<ul>'+
              '<li><a href="reportes.html">Reportes</a></li>'+
              '<li><a href="listarAdministradores.html">Administradores</a></li>'+
              '<li><a href="listarAsistentes.html">Asistentes</a></li>'+
          '</ul>'+
          '</li>'+
        '</ul>';
      break;
    case "asistente":
    menu.innerHTML = '<ul class="clear">'+
    '<li id="eventos"><a href="listarEventos.html">Eventos</a></li>'+
    '<li id="estudiantes"><a href="listarEstudiante.html">Estudiantes</a></li>'+
    '<li id="lugares" class="active"><a href="listarLugares.html">Lugares</a></li>'+
    '<li id="academias"><a href="listarAcademias.html">Academias</a></li>'+
      '<li id="organizaciones"><a href="listarOrganizaciones.html">Organizaciones</a></li>'+
    '<li id="listaProfesores"><a href="listarProfesores.html">Profesores</a></li>'+
    '<li id="patrocinadores"><a href="listarPatrocinadores.html">Patrocinadores</a></li>'+
    '<li id="ajustes"><a class="drop" href="#">Ajustes</a>'+
      '<ul>'+
          '<li><a href="reportes.html">Reportes</a></li>'+
          '<li><a href="listarAsistentes.html">Asistentes</a></li>'+
      '</ul>'+
      '</li>'+
    '</ul>';
      break;
    case "profesor":
    menu.innerHTML = '<ul class="clear">'+
    '<li id="estudiantes"><a href="listarEstudiantes.html">Estudiantes</a></li>'+
    '<li id="eventos"><a class="drop" href="listarEventos.html">Eventos</a>'+
      '<ul>'+
        '<li><a href="modificarEvento.html">Agregar Estudiante</a></li>'+
      '</ul>'+
      '</li>'+
    '</ul>';
      break;
    case "estudiante":
    menu.innerHTML = '<ul class="clear">'+
    '<li id="eventos"><a href="#">Eventos a participar</a></li>'+
    '<li id="historialeventos"><a href="#">Historial de eventos</a></li>'+
    '</ul>'
      break;
    default:

    menu.innerHTML = '<ul class="clear">'+
    '<li id="inicio" class="active"><a href="index.html">Inicio</a></li>'+
    '<li id="proximosEventos"><a href="proximosEventos.html">Eventos</a></li>'+
      '<li id="federacion"><a class="drop" href="#">Federación</a>'+
      '<ul>'+
        '<li><a href="misionVision.html">Misión y Visión</a></li>'+
        '<li><a href="juntaDirectiva.html">Junta Directiva</a></li>'+
      '</ul>'+
    '</li>'+
    '</ul>';
  }
}
function agregarEventListener() {

  li_total = document.querySelectorAll("#mainav .clear li");
  li_dentro = document.querySelectorAll("#mainav .clear ul li");
  for (var i = 0; i < li_total.length - li_dentro.length; i++) {
    li[i] = li_total[i];
    li[i].addEventListener("click", saveActive);
  }
}


function saveActive() {
  localStorage.setItem("paginaActivaLS", JSON.stringify(this.id));
}

function setActive() {
  active = document.querySelector("#mainav .active");
  active.classList=""
  pagina = JSON.parse(localStorage.getItem("paginaActivaLS"));
  for (var i = 0; i < li.length; i++) {
    if(pagina === li[i].id ){
      li[i].classList="active";
    }
  }
}
