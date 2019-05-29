<?php
require_once "models/searchcode.php";



$result = searchcode($_POST["postcode"]);
$values = $result[0];
echo json_encode($result);
