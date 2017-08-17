<?php  
	require_once '../../conexion.php';

	$idEventoCategoria = $_POST['pEventoCategoria'];
	$idEstudiante = $_POST['pEstudiante'];

	$setencia_sql = "CALL pa_agregar_estudiante_a_evento" . "('$idEventoCategoria','$idEstudiante')";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>