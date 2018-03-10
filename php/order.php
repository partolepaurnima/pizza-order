<?php

$result = json_encode($_POST);
$file = fopen("order.json","a");
// $result = '' $result . '],';
fwrite($file, $result);


?>