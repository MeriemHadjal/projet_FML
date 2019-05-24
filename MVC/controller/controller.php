<?php
function allProject($bdd)
{
    $donnees = $bdd->query(SELECT * FROM parking_covoit);
    return $donnees;
}


allProject($bdd);
