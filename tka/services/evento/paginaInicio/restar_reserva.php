<?php  
	require_once '../../conexion.php';

	$reserva = $_POST['cantidadReserva'];
	$idEvento = $_POST['idEvento'];


	$setencia_sql = "CALL 	pa_restar_entradas" . "('$idEvento','$reserva')";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>