<?php  
	require_once '../conexion.php';

	$idProfesor = $_POST['pidProfesor'];
	$idAcademia = $_POST['pidAcademia'];

	$setencia_sql = "CALL pa_registrar_academia_por_profesor" . "('$idProfesor', '$idAcademia')";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>