<?php  
	require_once '../../conexion.php';

	$idEventoCategoria = $_POST['pEventoCategoria'];
	$idEstudiante = $_POST['pEstudiante'];
	$peso = $_POST['pPeso'];
	$calificado = $_POST['pCalificado'];

	$setencia_sql = "CALL 		pa_ingresar_repesaje" . "('$peso','$calificado','$idEstudiante','$idEventoCategoria')";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>