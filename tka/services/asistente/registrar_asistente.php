<?php  
	require_once '../conexion.php';

	$foto = $_POST['pfoto'];
	$nombre = $_POST['pnombre'];
	$correo = $_POST['pcorreo'];
	$tipo = $_POST['ptipo'];
	$contrasenna = $_POST['pcontrasenna'];

	$setencia_sql = "CALL pa_registrar_usuario" . "('$foto','$nombre','$correo','$tipo','$contrasenna')";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>