<?php  
	require_once '../conexion.php';

	$estado = $_POST['pestado'];
	$Usuario_idUsuario = $_POST['pusuario_idUsuario'];

	$setencia_sql = "CALL pa_activar_desactivar_profesor" . "('$Usuario_idUsuario','$estado')";
	
	$resultado= $conexion->query($setencia_sql); //1 bueno 0 malo
	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>