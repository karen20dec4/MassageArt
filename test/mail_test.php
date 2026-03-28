<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $subject = "Test funcție mail()";
    $message = "Acesta este un email de test pentru a verifica dacă funcția mail() este activată și funcționează corect pe serverul tău.";
    $headers = "From: massageart@massageart.no"; // Înlocuiește cu o adresă validă de pe domeniul tău

    if (filter_var($to, FILTER_VALIDATE_EMAIL)) {
        if (mail($to, $subject, $message, $headers)) {
            echo "<p style='color: green;'>Emailul de test a fost trimis cu succes către <strong>$to</strong>. Verifică inbox-ul (și folderul spam).</p>";
        } else {
            echo "<p style='color: red;'>Eroare la trimiterea emailului de test. Verifică configurarea serverului tău de email.</p>";
        }
    } else {
        echo "<p style='color: red;'>Adresa de email introdusă nu este validă.</p>";
    }
} else {
    http_response_code(403);
    echo "Acces interzis.";
}
?>