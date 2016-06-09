<?php_track_vars?>

<?php

$msg = "用户邮箱:\t$sender_email\n";
$msg .= "用户昵称:\t$sender_name\n";
$msg .= "信息内容:\t$content\n\n";

$recipient = "webmaster@falcomfalfiction.com";
$subject = "药与玻璃渣 - 来自$sender_name的反馈";
$mailheaders = "From: 药与玻璃渣 <> \n";
$mailheaders .= "Reply-To: $sender_email\n\n";

mail($recipient, $subject, $msg, $mailheaders);

echo 