<?php  
	require_once '../conexion.php';

	$idlugar = $_POST['pidlugar'];
	$nombre = $_POST['pnombre'];
	$ubicacion = $_POST['pubicacion'];
	$telefono = $_POST['ptelefono'];
	$capacidad = $_POST['pcapacidad'];
	$latitud = $_POST['platitud'];
	$longitud = $_POST['plongitud'];

	$setencia_sql = "CALL pa_modificar_lugar" . "('$idlugar','$nombre','$ubicacion','$telefono','$capacidad','$latitud','$longitud')";
	
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>