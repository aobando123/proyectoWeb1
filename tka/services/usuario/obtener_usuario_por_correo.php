<?php  
	require_once '../conexion.php';

	$correo = $_POST['pcorreo'];

	$setencia_sql = "CALL pa_obtener_usuario_por_correo" . "('$correo')";
	
	$resultado= $conexion->query($setencia_sql);
	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	$filas = array();

 	 while ($registro = mysqli_fetch_assoc($resultado)) {
 	   $filas[]=$registro;
 	 }

  	echo json_encode($filas);
?>