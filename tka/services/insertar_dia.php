<?php  
	require_once 'conexion.php';

	$dia = array(0=>"Domingo",1=>"Lunes",2=>"Martes",3=>"Miércoles",4=>"Jueves",5=>"Viernes",6=>"Sábado");

	$setencia_sql = "";
	for ($i = 0; $i < count($dia); $i++) {

				$setencia_sql .= "CALL pa_insertar_dia" . "('$dia[$i]');";
	}
	$resultado= $conexion->multi_query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	?>