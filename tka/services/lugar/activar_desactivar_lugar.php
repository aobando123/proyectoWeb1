<?php  
	require_once '../conexion.php';

	$idlugar = $_POST['pidlugar'];
	$estado = $_POST['pestado'];
	
	$setencia_sql = "CALL pa_activar_desactivar_lugar" . "('$estado','$idlugar')";
	
	$resultado= $conexion->query($setencia_sql); //1 bueno 0 malo
	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>