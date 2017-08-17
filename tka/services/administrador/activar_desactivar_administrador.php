<?php  
	require_once '../conexion.php';

	$estado = $_POST['pestado'];
	$id_usuario = $_POST['pid_usuario'];

	$setencia_sql = "CALL pa_activar_desactivar_usuario" . "('$estado','$id_usuario')";

	
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>