<?php 
	require_once '../conexion.php';

	$setencia_sql = "CALL pa_listar_lugares";

	$result = $conexion->query($setencia_sql);

	if(!$result)die('Falló la consulta sql ' . $conexion->error);

  	$filas = array();

 	 while ($registro = mysqli_fetch_assoc($result)) {
 	   $filas[]=$registro;
 	 }

  	echo json_encode($filas);

?>