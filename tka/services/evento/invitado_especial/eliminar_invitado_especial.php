<?php  
	require_once '../../conexion.php';

	$invitado = $_POST['pInvitado'];


	$setencia_sql = "CALL pa_eliminar_invitados_especiales" . "('$invitado')";

	
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>