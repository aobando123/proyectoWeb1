<?php  
	require_once '../conexion.php';

	$idUsuario = $_POST['pid_usuario'];

	$setencia_sql = "CALL pa_obtener_academias_por_profesor" . "('$idUsuario')";
	
	$resultado= $conexion->query($setencia_sql);
	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	$filas = array();

 	 while ($registro = mysqli_fetch_assoc($resultado)) {
 	   $filas[]=$registro;
 	 }

  	echo json_encode($filas);
?>