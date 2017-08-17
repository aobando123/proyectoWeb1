<?php
	require_once '../conexion.php';

	$nombre = $_POST ['pNombreEstudiante'];
	$apellido1 = $_POST ['pApellido1'];
	$apellido2 = $_POST ['pApellido2'];
	$telefono = $_POST ['pTelefono'];
	$grado = $_POST ['pGrado'];
	$altura = $_POST ['pAltura'];
	$idAcademia = $_POST ['pIdAcademia'];
	$genero = $_POST ['pGenero'];
	$correo = $_POST ['pCorreo'];
	$idUsuario = $_POST ['pIdUsuario'];
	$peso = $_POST ['pPeso'];
	$torneos = $_POST ['pTroneos'];
	$fechaNacimiento = $_POST ['pFechaNacimiento'];
	$id = $_POST ['pId'];
	$idProfesor = $_POST ['pIdProfesor'];
	$estado = $_POST ['pEstado'];

	$sentencia_sql = "CALL pa_registrar_estudiante"."('$nombre','$apellido1','$apellido2','$telefono','$grado','$altura','$idAcademia','$genero','$correo','$idUsuario','$peso','$torneos','$fechaNacimiento','$id','$idProfesor','$estado')";

	$resultado =  $conexion->query($setencia_sql);//1 bueno 0 mal


	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>
