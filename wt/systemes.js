// définit les boutons et les textes
var buttons = document.getElementsByClassName("sysButtons");
var texts = document.getElementsByClassName("sysTexts");

// change l'affichage selon les boutons appuyés
function switchSys(id) {

    // mets tous les boutons en blanc
    for (let i = 0; i < 6; i++) {
		buttons[i].style.backgroundColor = "rgb(255, 255, 255)";
	}

    // cache tous les textes
    for (let i = 0; i < 6; i++) {
		texts[i].style.visibility = "hidden";
	}

    // Met le bouton appuyé en gris et affiche le texte souhaité
    document.getElementById(id).style.backgroundColor = "rgb(204, 204, 204)";
    switch(id){
        case "A0":
            document.getElementById("Introduction").style.visibility = "visible";
            break;

        case "A1":
            document.getElementById("Options").style.visibility = "visible";
            break;

        case "A2":
            document.getElementById("Cinematiques").style.visibility = "visible";
            break;

        case "A3":
            document.getElementById("Dialogues").style.visibility = "visible";
            break;

        case "A4":
            document.getElementById("Balises").style.visibility = "visible";
            break;

        case "A5":
            document.getElementById("Pouvoirs").style.visibility = "visible";
            break;
        
        default:
            document.getElementById("Introduction").style.visibility = "visible";
            break;
    }
}