<?php  
	require_once '../conexion.php';

	$idEvento = $_POST['pEvento'];
	$peso = $_POST['pPeso'];
	$edad = $_POST['pEdad'];
	$genero = $_POST['pGenero'];

	$categoriaExiste = "CALL pa_buscar_categoria_evento" . "('$idEvento','$edad','$peso', '$genero')";

	$result = "";
	$resultado= $conexion->query($categoriaExiste);//1 bueno 0 malo


	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);
	$registro = mysqli_fetch_assoc($resultado);
	if (!empty($registro)) {
		$registro = "Ya existe esa categoria";
	}

	echo json_encode($registro);
	?>