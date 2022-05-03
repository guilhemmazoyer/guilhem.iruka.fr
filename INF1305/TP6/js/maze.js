/* Définit les éléments composant les murs qu'il fait éviter */
var elements = document.getElementsByClassName("boundary");
/* Permet au code de savoir si le jeu est en cours */
var isrunning = false;
/* Initialise le compteur d'essaie */
var attempt = 1;

/* fonction d'initialisation mettant en place les addEventListener des murs, bouton start et bouton end */
function init() {
	for (let i = 0; i < 5; i++) {
		elements[i].addEventListener("mouseover", showlost);
	}
	document.getElementById("start").addEventListener("mouseover", start);
	document.getElementById("end").addEventListener("mouseover", end);
}

/* Fonction lors du début de partie en survolant la boite S */
function start() {
	isrunning = true;
	for (let i = 0; i < 5; i++) {
		elements[i].style.backgroundColor="#88ff88";
	}
	document.getElementById("status").innerHTML = "Reach the E box without touching any walls !";
}

/* Fonction lors de la fin de partie en survolant la boite E 
 * Si le jeu est en cours, vous avez gagné, les murs deviennent bleu, le titre change pour afficher la victoire et le nombre d'essaie et arrête le jeu.
 * Sinon change le titre sauf si le jeu est arrêté
 */
function end (){
	if(isrunning==true) {
		for (let i = 0; i < 5; i++) {
			elements[i].style.backgroundColor="#8888ff";
		}
		document.getElementById("status").innerHTML = "You win in "+attempt+" attempt";
		isrunning=null;
	}else if(isrunning!=null){
		document.getElementById("status").innerHTML = "You need to start the game to end it, go to the S box";
	}
}

/* Fonction lors de la fin de partie en survolant un mur
 * Si le jeu est en cours ça l'arrête, les murs deviennt rouges, le titre change et le compteur d'essaie s'incrémente de 1
 * Sinon ne fait rien
 */
function showlost(){
	if(isrunning==true) {
		isrunning = false;
		for (let i = 0; i < 5; i++) {
			elements[i].style.backgroundColor="#ff4444";
		}
		document.getElementById("status").innerHTML = "You lose, try again !";
		attempt +=1;
	}
}

/* Exécute la fonction init() et charge entièrement la page html */
window.onload = init;