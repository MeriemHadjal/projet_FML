

<?php
try {
// On se connecte à MySQL
$bdd = new PDO("mysql:host=localhost;dbname=blablacar;charset=utf8", "root", "");
} catch (Exception $e) {
// En cas d'erreur, on affiche un message et on arrête tout
die('Erreur : ' . $e->getMessage());
}

// Si tout va bien, on peut continuer

// On récupère tout le contenu de la table jeux_video

$reponse = $bdd->query('SELECT * FROM parking_covoit');



//$reponse = $bdd->prepare('SELECT * FROM blablacar');
//$reponse->execute();
// On affiche chaque entrée une à une
while ($donnees = $reponse->fetch()) {
?>


<p>
<strong>Jeu</strong> : <?php echo $donnees['m du lieu']; ?><br />
Le possesseur de ce jeu est : <?php echo $donnees['Adresse']; ?>, et il le vend à
<?php echo $donnees['Code postal']; ?> euros !<br />

</p>
<?php
}

$reponse->closeCursor(); // Termine le traitement de la requête

?>


