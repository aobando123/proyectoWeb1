<?php 
	require_once '../conexion.php';

	$idEvento = $_POST['pEvento'];
	$setencia_sql = "CALL pa_listar_categorias_evento" . "('$idEvento')";

	$result = $conexion->query($setencia_sql);

	if(!$result)die('Fallo la consulta sql ' . $conexion->error);

  	$filas = array();

 	 while ($registro = mysqli_fetch_assoc($result)) {
 	   $filas[]=$registro;
 	 }

  	echo json_encode($filas);

?>