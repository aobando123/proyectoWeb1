<?php  
	require_once '../../conexion.php';

	$idEvento = $_POST['pEvento'];
	$idAcademia = $_POST['pAcademia'];

	$setencia_sql = "CALL pa_eliminar_academia_de_evento" . "('$idEvento','$idAcademia')";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>