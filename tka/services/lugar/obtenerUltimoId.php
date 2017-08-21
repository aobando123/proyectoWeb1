<?php 
	error_reporting(E_ALL);
	ini_set('display_errors', '1'); 
	
	require_once '../conexion.php';
	
	$setencia_sql = "CALL pa_retornar_ultimo_id_lugares";
	$result = $conexion->query($setencia_sql);
	if(!$result)die('Falló la consulta sql de ultimo id' . $conexion->error);
  	$registro = mysqli_fetch_assoc($result);
	
	echo json_encode($registro);
 	 
?>