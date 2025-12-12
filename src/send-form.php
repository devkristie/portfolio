<?php
    // Show errors during development (disable on production)
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    // Load config and PHPMailer
    require __DIR__ . '/config.php';
    require 'assets/phpmailer/PHPMailer.php';
    require 'assets/phpmailer/SMTP.php';
    require 'assets/phpmailer/Exception.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    // Get POST data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $botcheck = $_POST['botcheck'] ?? '';
    $hcaptcha = $_POST['h-captcha-response'] ?? '';
    $redirect = $_POST['redirect'] ?? '';

    // Validate email format to ensure it is a properly formatted email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit('Invalid email address.');
    }

    // Honeypot bot check: if the hidden 'botcheck' field is filled, exit the script
    if (!empty($botcheck)) {
        exit('Bot detected');
    }

    // Ensure hCaptcha was completed; if not, stop the submission
    if (empty($hcaptcha)) {
        exit('Please complete the captcha');
    }

    // Limit message length to prevent excessively large submissions or abuse
    if (strlen($message) > 5000) {
        exit('Message too long.');
    }

    // Verify hCaptcha server-side using cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://hcaptcha.com/siteverify');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'secret' => HCAPTCHA_SECRET, // your private secret key from config.php
        'response' => $hcaptcha
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $verify = curl_exec($ch);
    curl_close($ch);

    $captcha_success = json_decode($verify);
    if (!$captcha_success->success) {
        exit('Captcha verification failed. Please try again.');
    }

    // Send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port       = SMTP_PORT;

        // Email recipients
        $mail->setFrom(EMAIL_FROM);
        $mail->addAddress(EMAIL_TO);
        if (!empty(EMAIL_CC)) $mail->addCC(EMAIL_CC);
        if (!empty(EMAIL_BCC)) $mail->addBCC(EMAIL_BCC);

        // Email content
        $mail->Subject = "Portfolio form submission from $name";
        $mail->Body    = "Name: $name\n\nEmail: $email\n\nPhone: $phone\n\nMessage:\n$message";

        // Send email
        $mail->send();

        // Redirect to Thank You page
        if (!empty($redirect)) {
            header("Location: $redirect");
            exit();
        } else {
            echo "Message sent!";
        }
    } catch (Exception $e) {
        echo "Message could not be sent. Please try again later.";
        error_log("Mailer Error: " . $mail->ErrorInfo);
    }
?>