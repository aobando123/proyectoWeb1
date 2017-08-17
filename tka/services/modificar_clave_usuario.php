<?php  
	require_once 'conexion.php';

	$contrasenna = $_POST['pcontrasenna'];
	$id_usuario = $_POST['pid_usuario'];
	$generica = $_POST['pgenerica'];

	$setencia_sql = "CALL pa_modificar_clave_usuario" . "('$contrasenna','$id_usuario','$generica')";
	
	$resultado= $conexion->query($setencia_sql);

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>