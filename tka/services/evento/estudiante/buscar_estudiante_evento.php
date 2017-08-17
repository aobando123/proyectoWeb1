<?php  
	require_once '../../conexion.php';

	$idEventoCategoria = $_POST['pEventoCategoria'];
	$idEstudiante = $_POST['pEstudiante'];

	$categoriaExiste = "CALL pa_buscar_estudiante_en_evento" ."('$idEventoCategoria','$idEstudiante')";

	$result = "";
	$resultado= $conexion->query($categoriaExiste);//1 bueno 0 malo


	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);
	$registro = mysqli_fetch_assoc($resultado);
	if (!empty($registro)) {
		$registro = "Ya existe ese estudiante";
	}

	echo json_encode($registro);
	?>