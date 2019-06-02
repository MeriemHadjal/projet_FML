<?php
switch ($_GET['code']) {
    case '404':
        header('Location:http://localhost/projet_FML/MVC/erreur-404.php');
        break;

    case '200':
        header('Location:http://localhost/projet_FML/MVC/erreur-404.php');
        break;
    case '301':
        header('Location:http://localhost/projet_FML/MVC/erreur-404.php');
    default:
        header((' Location: http: //localhost/projet_FML/MVC/view/erreur-404.php');
}
