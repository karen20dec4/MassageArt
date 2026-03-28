<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "contact@massageart.no"; // Schimbă cu adresa ta
    $subject = "MassageArt.no - Formular contact";

    // Preia datele din formular
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    // Creează corpul emailului
    $email_content = "Ai primit un mesaj nou de pe site-ul MassageArt.no:\n\n";
    $email_content .= "Nume: $name\n";
    $email_content .= "Telefon: $phone\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mesaj:\n$message\n";

    // Setează antetele
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Trimite emailul
   if (mail($to, $subject, $email_content, $headers)) {
        echo "<p style='color:green;'>Message successfully sent!</p>";
        echo "<meta http-equiv='refresh' content='2;url=contact.html'>";
    } else {
        echo "<p style='color:red;'>!!!   Error sending the email.   !!!</p>";
        echo "<meta http-equiv='refresh' content='2;url=contact.html'>";
    }
}
?>