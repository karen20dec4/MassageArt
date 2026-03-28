<?php
$to = "karen20dec4@yahoo.com"; // înlocuiește cu adresa ta
$subject = "2 - Test mail() de pe server";
$message = "2 - Acesta este un email de test trimis folosind funcția mail() din PHP. folosind fisierul test-email.php";
$headers = "From: contact@massageart.no";

if (mail($to, $subject, $message, $headers)) {
    echo "Email trimis cu succes!";
} else {
    echo "Eroare la trimiterea emailului.";
}
?>