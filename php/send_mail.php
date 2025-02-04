<?php
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// フォームのデータを受け取る
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$inquiry = isset($_POST['inquiry']) ? implode(', ', $_POST['inquiry']) : '未選択';
$response = $_POST['response'] ?? '未選択';
$age = $_POST['age'] ?? '未選択';

// 文字エンコード設定
mb_language('Japanese');
mb_internal_encoding('UTF-8');

// PHPMailerのインスタンスを作成
$mail = new PHPMailer(true);

try {
    // SMTP設定
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'yoshitakakai.net@gmail.com';
    $mail->Password   = 'jntjwmeskdvmebwj';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // エンコーディング設定（文字化け対策）
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    // 送受信先設定
    $mail->setFrom('yoshitakakai.net@gmail.com', 'お問い合わせフォーム'); 
    $mail->addAddress($email, $name);  
    $mail->addReplyTo('yoshitakakai.net@gmail.com', 'カスタマーサポート'); 

    // 件名と本文
    $mail->Subject = 'お問い合わせがありました: ' . $name;
    $mail->Body    = "名前: $name" . PHP_EOL . 
                     "メール: $email" . PHP_EOL . 
                     "お問い合わせ内容: " . $inquiry . PHP_EOL .
                     "希望する対応方法: " . $response . PHP_EOL .
                     "年代: " . $age . PHP_EOL;
                     "メッセージ: " . PHP_EOL . 
                     $message . PHP_EOL . PHP_EOL;

    // 送信
    $mail->send();

    // 成功したらリダイレクト
    header('Location: thanks.php');
    exit;

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
