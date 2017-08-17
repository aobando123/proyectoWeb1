<?php  
	require_once '../conexion.php';

	$idCategoria_evento = $_POST['pcategoriaEvento'];


	$setencia_sql = "CALL 	pa_eliminar_categoria_evento" . "('$idCategoria_evento')";

	
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>