<?php 
	require_once '../conexion.php';
	
	$idUsuario = $_POST['pid_usuario'];

	$setencia_sql = "CALL pa_obtener_profesor_por_id" . "('$idUsuario')";

	$result = $conexion->query($setencia_sql);

	if(!$result)die('Falló la consulta sql ' . $conexion->error);

  	$filas = array();

 	 while ($registro = mysqli_fetch_assoc($result)) {
 	   $filas[]=$registro;
 	 }

  	echo json_encode($filas);

?>