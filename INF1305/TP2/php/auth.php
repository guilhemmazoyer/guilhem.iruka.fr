<?php

$nom = 'Guilhem';
$mdp = 'Toto56';

$login=$_POST['login'];
$pwd=$_POST['pwd'];

if($login==$nom){
	if($pwd==$mdp){
		echo 'Salut '$nom'. Bienvenue sur mon site !';
	}
}
else {
	echo 'Les données saisies sont incorrectes. Veuillez cliquer ici pour vous authentifier.';
	}
?>