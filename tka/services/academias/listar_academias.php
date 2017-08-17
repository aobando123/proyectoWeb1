<?php
  require_once '../conexion.php';

  $sentencia_sql = "CALL pa_listar_academias";

  $result = $conexion->query($sentencia_sql);

  if(!$result)die('Fallo la consulta sql ' . $conexion->error);

  $filas = array();

  while ($registro = mysqli_fetch_assoc($result)) {
    $filas[]=$registro;
  }

  echo json_encode($filas);

?>