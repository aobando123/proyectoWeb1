<?php  
	require_once '../conexion.php';

	$nombre = $_POST['pnombre'];
	$fechaIni = $_POST['pfechaIni'];
	$fechaFin = $_POST['pfechaFin'];
	$tipo = $_POST['ptipo'];
	$inscripcion = $_POST['pcostoInscrpcion'];
	$costoEntradas = $_POST['pcostoEn'];
	$entradas = $_POST['pEntradas'];
	$lugar = $_POST['pLugar'];

	$setencia_sql = "CALL pa_registrar_evento" . "('$nombre','$fechaIni','$fechaFin', '$tipo' , '$costoEntradas' , '$entradas' , '$inscripcion' , '$lugar' )";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>