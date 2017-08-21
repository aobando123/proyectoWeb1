<?php  
	require_once '../conexion.php';

	$foto = $_POST['pfoto'];
	$nombre = $_POST['pnombre'];
	$correo = $_POST['pcorreo'];
	$tipo = $_POST['ptipo'];
	$contrasenna = $_POST['pcontrasenna'];
	$primer_apellido = $_POST['pprimer_apellido'];
	$segundo_apellido = $_POST['psegundo_apellido'];

	$setencia_sql = "CALL pa_registrar_usuario" . "('$foto','$nombre','$correo','$tipo', '$contrasenna','$primer_apellido', '$segundo_apellido')";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Falló la consulta sql " . $conexion->error);

	echo json_encode($resultado);
?>