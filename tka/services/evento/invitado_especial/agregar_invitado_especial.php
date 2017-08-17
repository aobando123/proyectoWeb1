<?php  
	require_once '../../conexion.php';

	$idEvento = $_POST['pEvento'];
	$nombre = $_POST['pnombre'];
	$correo = $_POST['pcorreo'];
	$telefono = $_POST['ptelefono'];

	$setencia_sql = "CALL 	pa_agregar_invitados_especiales" . "('$idEvento','$nombre','$correo','$telefono')";
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>