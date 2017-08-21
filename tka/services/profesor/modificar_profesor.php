<?php  
	require_once '../conexion.php';

	$fechaNacimiento = $_POST['pfechaNacimiento'];
	$edad = $_POST['pedad'];
	$telefono = $_POST['ptelefono'];
	$genero = $_POST['pgenero'];
	$Usuario_idUsuario = $_POST['pUsuario_idUsuario'];

	$setencia_sql = "CALL pa_modificar_profesor" . "('$fechaNacimiento','$edad','$telefono','$genero', '$Usuario_idUsuario')";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>