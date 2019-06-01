<?php
$uri = $_SERVER['REQUEST_URI'];
$parts = explode('/', rtrim($uri, '/'));

include_once('models/bdd.php');
include_once('models/twig.php');

// var_dump($parts);
switch ($parts[3]) {
    case "base";
        echo "babar";
        break;


    case "accueil";
        echo $twig->render('index.html.twig');
        break;


    case "map";
        $donnees = $bdd->query("SELECT * FROM parking_covoit");
        $result = $donnees->fetchAll();

        echo $twig->render('map.html.twig', [
            "donnees" => $result
        ]);


    case "searchcode":
        require_once "controller/searchcode.php";

        break;

    case "mention";
        echo $twig->render('mention.html.twig');
        break;
}
