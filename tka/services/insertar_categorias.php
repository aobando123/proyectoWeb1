 	<?php  
	require_once 'conexion.php';

	$peso = array(0=>"pluma",1=>"gallo",2=>"supergallo",3=>"welter",4=>"pesado");
	$edad = array(0=>"infantil",1=>"cadete",2=>"elite",3=>"senior");
	$genero = array(0=>"masculino","femenino");
	$setencia_sql = "";
	for ($i = 0; $i < count($peso); $i++) {
    	for ($j=0; $j < count($edad) ; $j++) { 
    		for ($g=0; $g < count($genero); $g++) { 
				$setencia_sql .= "CALL pa_insertar_categorias" . "('$peso[$i]','$edad[$j]','$genero[$g]');";
    		}
    	}
	}
	$resultado= $conexion->multi_query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($setencia_sql);
	?>