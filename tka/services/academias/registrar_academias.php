<?php
	require_once '../conexion.php';

	$nombreAcademia = $_POST['pNombreAcademia'];
	$ubicacion = $_POST['pUbicacion'];
	$telefono = $_POST['pTelefono'];
	$personaContacto = $_POST['pPersonaContacto'];
	$correo = $_POST['pCorreo'];

	$sentencia_sql = "CALL pa_registrar_academia" . "('$nombreAcademia','$ubicacion','$telefono','$personaContacto','$correo')";

	$result = $conexion->query($sentencia_sql);

	if(!$result)die('Fallo la consulta sql ' . $conexion->error);

	echo json_encode($result);
?>
