<?php
function allProject($bdd)
{
    $donnees = $bdd->query("SELECT * FROM parking_covoit");
    return $donnees;
}


allProject($bdd);



function markerBlue($bdd)
{
    $blue = $bdd->query("SELECT * FROM parking_covoit WHERE Type1 = 'Train_stations' OR Type1 = 'Gare_peage' OR Type1 = 'Sortie_autoroute'");
    return $blue;
}

$markerBlue = markerBlue($bdd);



function markerGreen($bdd)
{
    $green = $bdd->query("SELECT * FROM parking_covoit WHERE Type1 = 'Aire_covoiturage'");
    return $green;
}

$markerGreen = markerGreen($bdd);



function markerYellow($bdd)
{
    $yellow = $bdd->query("SELECT * FROM parking_covoit WHERE Type1 = 'Parking' OR Type1 = 'P+R' ");
    return $yellow;
}

$markerYellow = markerYellow($bdd);


function markerRed($bdd)
{

    $red = $bdd->query("SELECT * FROM parking_covoit WHERE Type1 = 'Supermarket' OR Type1 = 'Building' ");
    return $red;
}


$markerRed = markerRed($bdd);
