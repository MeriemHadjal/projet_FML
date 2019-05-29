<?php

function searchcode($postcode)
{
    global $bdd;
    $sql = "SELECT * FROM parking_covoit WHERE code_postal like :postcode"; //":postcode" pour eviter injection sql -> sth prepare
    $sth = $bdd->prepare($sql);
    $sth->bindValue(":postcode", $postcode . '%', PDO::PARAM_STR); // $postcode.% = prend le code postal qui commence par 25 et modifie les 3 derniers chiffres pour pouvoir obtenir tous les codes postaux commençant par 25 ex:25320 ou 25000//marker :postcode relier à $postecode.% et on attend une chaine de caractere
    $sth->execute();
    return $sth->fetchAll(PDO::FETCH_ASSOC); //association par tableau : retourne tableau avec nom de la colonne 

}
