<?php  
	require_once '../conexion.php';

	$nombre = $_POST['pnombre'];
	$tipo = $_POST['ptipo'];
	$descripcion = $_POST['pdescripcion'];
	$codigo = $_POST['pcodigo'];
	$idOrganizacion = $_POST['pid_organizacion'];

	$setencia_sql = "CALL pa_modificar_organizacion" . "('$nombre','$tipo','$descripcion','$codigo','$idOrganizacion')";
	
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>