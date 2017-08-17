<?php  
require_once 'credenciales.php';
$conexion =  new mysqli($hostname,$username,$password,$db_name);


if($conexion->connect_error)die(($conexion->error)." No se pudo establecer conexion, revise la crendenciales");


$conexion->set_charset("utf8");
?>