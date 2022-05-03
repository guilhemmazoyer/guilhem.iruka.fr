<?php

$nom=$_GET['nom'];
$prenom=$_GET['prenom'];
$email=$_GET['email'];
$commentaire=$_GET['commentaire'];

if(isset($nom)||isset($prenom)||isset($email)||isset($commentaire)){
	echo 'Merci de nous contacter,\n Votre message sera transmis dans les plus bref délais :\n Nom :'$nom'\n Prenom :'$prenom'\n Email :'$email'\n Commentaire :'$commentaire;

	//Ajoute la demande de contacte au fichier texte contacte

		//On récupère le contenu du fichier
		$texte = file_get_contents('contact.txt');

		//On ajoute notre nouveau texte à l'ancien
		$texte .= "\nNom : "$nom"\nPrenom : "$prenom"\nEmail : "$email"\nCommentaire : "$commentaire"\n";

		//On écrit tout le texte dans notre fichier
		file_put_contents('contact.txt', $texte);
}
?>