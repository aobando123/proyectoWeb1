<?php  
	require_once '../conexion.php';

	$estado = $_POST['pestado'];

	$setencia_sql = "CALL pa_obtener_profesor_por_estado" . "('$estado')";
	
	$resultado= $conexion->query($setencia_sql);
	if(!$resultado)die("Fall� la consulta sql " . $conexion->error);

	$filas = array();

 	 while ($registro = mysqli_fetch_assoc($resultado)) {
 	   $filas[]=$registro;
 	 }

  	echo json_encode($filas);
?>