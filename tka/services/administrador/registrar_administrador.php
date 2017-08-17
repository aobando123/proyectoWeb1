<?php  
	require_once '../conexion.php';

	$foto = $_POST['pfoto'];
	$nombre = $_POST['pnombre'];
	$correo = $_POST['pcorreo'];
	$tipo = $_POST['ptipo'];
	$contrasenna = $_POST['pcontrasenna'];
	
	$setencia_sql = "CALL pa_registrar_usuario" . "('$foto','$nombre','$correo','$tipo','$contrasenna')";

	$resultado= $conexion->query($setencia_sql);//1 bueno 0 malo

	if(!$resultado)die("Fallo la consulta sql " . $conexion->error);

	echo json_encode($resultado);
	
	/*******MAIL*******/
	header("Content-Type: text/html;charset=utf-8");
	require '../../phpmailer/PHPMailerAutoload.php';
	$texto = "
	A sido registrado en el sitio de la Federación Costarricense de Taekwondo<br>
	Sus datos de acceso son los siguientes:<br>
	
	Usuario: $correo<br>
	Clave: $contrasenna<br>
	Tipo de Perfil: $tipo<br>

	Ingrese al sistema <a href='http://localhost:8888/tka/login.html'>LINK</a> y asigne una nueva clave para su cuenta.
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
	?>