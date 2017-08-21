<?php  
	require_once '../../conexion.php';

	$idEvento = $_POST['pEvento'];
	$idPatrocinador = $_POST['pPatrocinador'];

	$setencia_sql = "CALL pa_agregar_patrocinador_a_evento" . "('$idEvento','$idPatrocinador')";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>