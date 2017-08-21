<?php 
	error_reporting(E_ALL);
	ini_set('display_errors', '1'); 
	
	require_once '../conexion.php';
	
	$idlugar = $_POST['pultimoid'];
	
	for($i = 1; $i<=7; $i++){
		
		switch($i){
			case 1:
			$dia= "domingo";
			$entrada = $_POST['pdomingoentrada'];
			$salida = $_POST['pdomingosalida'];
			
			break;
			case 2:
			$dia= "lunes";
			$entrada = $_POST['plunesentrada'];
			$salida = $_POST['plunessalida'];
			
			break;
			case 3:
			$dia= "martes";
			$entrada = $_POST['pmartesentrada'];
			$salida = $_POST['pmartessalida'];
			
			break;
			case 4:
			$dia= "miercoles";
			$entrada = $_POST['pmiercolesentrada'];
			$salida = $_POST['pmiercolessalida'];
			
			break;
			case 5:
			$dia= "jueves";
			$entrada = $_POST['pjuevesentrada'];
			$salida = $_POST['pjuevessalida'];
			
			break;
			case 6:
			$dia= "viernes";
			$entrada = $_POST['pviernesentrada'];
			$salida = $_POST['pviernessalida'];
			
			break;
			case 7:
			$dia= "sabado";
			$entrada = $_POST['psabadoentrada'];
			$salida = $_POST['psabadosalida'];
			break;
			}
			
			if($_POST["p".$dia."entrada"] != 0 && $_POST["p".$dia."salida"] != 0){
				
				$setencia_sql = "CALL pa_registrar_horario_lugar" . "('$i','$idlugar','$entrada','$salida')";
				$resultado = $conexion->query($setencia_sql);
			
				}else{
					
					$entrada = "cerrado";
					$salida = "cerrado";
					$setencia_sql = "CALL pa_registrar_horario_lugar" . "('$i','$idlugar','$entrada','$salida')";
					$resultado = $conexion->query($setencia_sql);
					
					}
		}
		
					
		if(!$resultado)die("Falló la consulta sql de horario " . $conexion->error);		
		echo json_encode($resultado);
?>