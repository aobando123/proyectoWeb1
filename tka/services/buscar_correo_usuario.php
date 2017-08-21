<?php  
	require_once 'conexion.php';

	$pcorreo = $_POST['pcorreo'];

	$setencia_sql = "CALL pa_buscar_correo" . "('$pcorreo')";
	
	$result = $conexion->query($setencia_sql);

	if(!$result)die('Fallo la consulta sql ' . $conexion->error);

  	$registro = mysqli_fetch_assoc($result);
	
	echo json_encode($registro);
	
	if(json_encode($registro) != "null"){
		
	$correo = $registro['correo'];
	$contrasenna = $registro['contrasenna'];
		
	/*******MAIL*******/
	header("Content-Type: text/html;charset=utf-8");
	require '../phpmailer/PHPMailerAutoload.php';
	$texto = "
	Sus datos de acceso son los siguientes:<br>
	
	Usuario: $correo<br>
	Clave: $contrasenna<br>

	Ingrese al sistema en el siguiente <a href='http://localhost:8888/tka/login.html'>ENLACE</a>
	";
	
	$mensaje = utf8_decode(nl2br($texto));
	
	$direccion= $correo;
	$nombre= utf8_decode("Federación Costarricense de Taekwondo");
	$email="carvaec@gmail.com";
	$clave="esteban0406";
	$mail = new PHPMailer;
	
	$mail->isSMTP();                   // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';   // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;          // Enable SMTP authentication
	$mail->Username = $email;       // SMTP username
	$mail->Password = $clave;      // SMTP password
	$mail->SMTPSecure = 'tls';    // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;           // TCP port to connect to
	
	$mail->isHTML(true);
	$mail->setFrom($email, $nombre);
	
	$mail->addAddress($direccion);     // Add a recipient
	
	
	$mail->Subject = utf8_decode("Clave genérica - Federación Costarricense de Taekwondo");
	$mail->Body    = $mensaje;
	
	
	if(!$mail->send()) {
	console.log("El correo no pudo ser enviado");
	console.log($mail->ErrorInfo);
	} else {
	console.log("Correo ha sido enviado");
	}
	/*******MAIL*******/
		
		}
	
	?>