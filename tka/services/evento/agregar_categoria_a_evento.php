<?php  
	require_once '../conexion.php';

	$idEvento = $_POST['pEvento'];
	$peso = $_POST['pPeso'];
	$edad = $_POST['pEdad'];
	$genero = $_POST['pGenero'];

	$setencia_sql = "CALL pa_agregar_categoria_a_evento" . "('$idEvento','$peso','$edad', '$genero')";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>