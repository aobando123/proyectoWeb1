<?php  
	require_once '../conexion.php';

	$estado = $_POST['pestado'];
	$idOrganizacion = $_POST['pid_organizacion'];

	$setencia_sql = "CALL pa_activar_desactivar_organizacion" . "('$estado','$idOrganizacion')";
	
	$resultado= $conexion->query($setencia_sql); //1 bueno 0 malo
	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>