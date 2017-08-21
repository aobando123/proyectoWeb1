<?php 
	require_once '../conexion.php';
	
	$idLugar = $_POST["pIdLugar"];
	
	$setencia_sql = "CALL pa_listar_horario_lugar" . "('$idLugar')";

	$result = $conexion->query($setencia_sql);

	if(!$result)die('Falló la consulta sql ' . $conexion->error);

  	$filas = array();

 	 while ($registro = mysqli_fetch_array($result)) {
 	   $filas[]=$registro;
 	 }

  	echo json_encode($filas);

?>