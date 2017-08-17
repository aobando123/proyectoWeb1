<?php  
	require_once '../conexion.php';

	$foto = $_POST['pfoto'];
	$nombre = $_POST['pnombre'];
	$correo = $_POST['pcorreo'];
	$id_usuario = $_POST['pid_usuario'];

	if ($foto == "images/perfil.jpg") {
		$setencia_sql = "CALL pa_modificar_usuario_sinImagen" . "('$nombre','$correo','$id_usuario')";
	}
	else{
		$setencia_sql = "CALL pa_modificar_usuario_conImagen" . "('$foto','$nombre','$correo','$id_usuario')";
	}
	
	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>