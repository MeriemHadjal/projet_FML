<?php
$uri = $_SERVER['REQUEST_URI'];
$parts = explode('/', rtrim($uri, '/'));


// var_dump($parts);
switch ($parts[4]) {
    case "index";
        // include_once('/view/index.html.twig');
        echo "babar";
        break;


    case "map";
        // include_once('/view/map.html.twig');
        break;

    case "mention";
        // include_once('/view/mention.html.twig');
        break;
}
// include_once('/view/base.html.twig');
