<?php 
	require_once '../../conexion.php';

	$idEvento = $_POST['pevento'];
	$idOrganizacion = $_POST['pOrganizacion'];
	$setencia_sql = "CALL pa_eliminar_organizacion_de_evento" . "('$idEvento','$idOrganizacion')";

	$result = $conexion->query($setencia_sql);

	if(!$result)die('Fallo la consulta sql ' . $conexion->error);

 
  	echo json_encode($result);

?>