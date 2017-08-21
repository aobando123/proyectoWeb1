<?php  
	require_once '../conexion.php';

	$idAcademia = $_POST['pid_academia'];
	$idProfesor = $_POST['pid_profesor'];

	$setencia_sql = "CALL pa_modificar_academia_por_profesor" . "('$idAcademia','$idProfesor')";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>