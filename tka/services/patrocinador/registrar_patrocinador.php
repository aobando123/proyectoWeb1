<?php
 	require_once '../conexion.php';

	$nombrePatrocinador = $_POST['pNombrePatrocinador'];
  $logoCompannia = $_POST['pLogo'];
  $NombreCompannia = $_POST['pNombreCompannia'];
  $estado = $_POST['pEstado'];

  $sentencia_sql = "CALL pa_registrar_patrocinador" . "('$nombrePatrocinador','$logoCompannia','$NombreCompannia','$estado')";

  $result = $conexion->query($sentencia_sql);

  if(!$result)die('Fallo la consulta sql ' . $conexion->error);

  echo json_encode($result);
?>
