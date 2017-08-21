<?php  
	require_once '../conexion.php';

	$identificacion = $_POST['pidentificacion'];
	$fechaNacimiento = $_POST['pfechaNacimiento'];
	$edad = $_POST['pedad'];
	$telefono = $_POST['ptelefono'];
	$Usuario_idUsuario = $_POST['pUsuario_idUsuario'];
	$genero = $_POST['pgenero'];

	$setencia_sql = "CALL pa_registrar_profesor" . "('$identificacion','$fechaNacimiento','$edad','$telefono', '$Usuario_idUsuario','$genero')";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>