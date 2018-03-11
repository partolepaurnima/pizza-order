<?php

$result = json_encode($_POST);

$str = file_get_contents('order.json');
$old = '{"pizza":[';
$old2 = ']}';
$new = '';
$new2 = '';
$arrayBraces = '';
$st = str_replace($old, $new, $str);
$st = str_replace($old2, $new2, $st);
$result = $st . $result;
$arrayBraces = '{"pizza":[' . $result . ']}';
$arrayBraces = str_replace("}{", "},{", $arrayBraces);
file_put_contents('order.json', $arrayBraces);
?>