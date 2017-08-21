<?php 
	error_reporting(E_ALL);
	ini_set('display_errors', '1'); 
	
	require_once '../conexion.php';

	$nombre = $_POST['pnombre'];
	$ubicacion = $_POST['pubicacion'];
	$telefono = $_POST['ptelefono'];
	$capacidad = $_POST['pcapacidad'];
	$latitud = $_POST['platitud'];
	$longitud = $_POST['plongitud'];
	
	$setencia_sql = "CALL pa_registrar_lugar" . "('$nombre','$ubicacion','$telefono','$capacidad','$latitud','$longitud')";
	$resultado= $conexion->query($setencia_sql);
	
	if(!$resultado)die("Falló la consulta sql de lugar " . $conexion->error);

	echo json_encode($resultado);
?>