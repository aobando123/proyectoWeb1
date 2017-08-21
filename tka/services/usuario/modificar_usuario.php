<?php  
	require_once '../conexion.php';

	$nombre = $_POST['pnombre'];
	$correo = $_POST['pcorreo'];
	$id_usuario = $_POST['pid_Usuario'];
	$primer_apellido = $_POST['pprimer_apellido'];
	$segundo_apellido = $_POST['psegundo_apellido'];

	$setencia_sql = "CALL pa_modificar_usuario" . "('$nombre','$correo','$id_usuario','$primer_apellido','$segundo_apellido')";
	
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>