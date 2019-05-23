<?php
$uri = $_SERVER['REQUEST_URI'];
$parts = explode('/', rtrim($uri, '/'));


// var_dump($parts);
switch ($parts[3]) {
    case "index";
        // include_once('/view/index.html.twig');
        echo "babar";
        break;


    case "map";
        echo "map";
        break;

    case "mention";
        echo "mention";
        break;
}
