<?php
	require_once '../conexion.php';

  $altura = $_POST ['paltura'];
	$correo = $_POST['pcorreo'];
	$edad = $_POST['pedad'];

	$fechaNacimiento = $_POST ['pfechaNacimiento'];
	$genero = $_POST ['pgenero'];
	$grado = $_POST ['pgrado'];
	$identificacion = $_POST ['pidentificacion'];
	$nombre = $_POST['pnombre'];
  $peso = $_POST ['ppeso'];
  $primerapellido = $_POST ['pprimerapellido'];
  $segundoapellido = $_POST ['psegundoapellido'];

  $telefono = $_POST ['ptelefono'];
  $NombreAcademia = $_POST['pnombreacademia'];

		$setencia_sql = "CALL pa_modificar_estudiante" . "($altura','$correo','$edad','$fechaNacimiento','
    $genero','$grado','$identificacion','$nombre','$peso','$primerapellido','$segundoapellido','
    $telefono','$NombreAcademia)";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>
