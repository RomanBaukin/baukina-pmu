<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

// декодирование данных
$_POST = json_decode(file_get_contents('php://input'), true);

//Переменная $name,$phone, $mail получает данные при помощи метода POST из формы
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
// $email = $_POST['user_email'];
$message = $_POST['user_message'];

//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "1687853334:AAFkfmFSVHYlPdsseMFddG8Dum0xHfrrHuU";

//нужна вставить chat_id (Как получить chad id, читайте ниже)
$chat_id = "-1001233050136";

//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон:' => $phone,
  'Сообщение:' => $message
);

//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
$txt = '';
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
// if ($sendToTelegram) {
//   header('Location: thanks.html');
// } else {
//   header('Location: error.html');
// }
?>