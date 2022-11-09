const title = document.getElementById('homepage-title')

const screenWidth = window.screen.width;

const maxNeonTitleFontSize = 2; //2em
const minNeonTitleFontSize = 0; //0em

const maxNeonButtonFontSize = 1.25; //1.25em
const minNeonButtonFontSize = 0; //0em

const maxCardTitleFontSize = 2.5; //2.5em
const minCardTitleFontSize = 0; //0em

const maxCardTextFontSize = 1.25; //1.25em
const minCardTextFontSize = 0; //0em

function testFontToChange(){
    var currentScreenWidth = window.innerWidth
    var ratio = currentScreenWidth / screenWidth;
    if(ratio < 0.5){

    }else{
        
    }
}
function changeFontSize(){
    var currentScreenWidth = window.innerWidth
    var ratio = currentScreenWidth / screenWidth;
    documet
    //document.body.style.height = windowWidth + "px";
    console.log(windowHeight);
    console.log(maxSize);
    console.log(maxSize2);
}

function scrollTitle(){
    var value = window.scrollY;
    title.style.top = 'calc(15vh + ' + value + '*0.4px)';
}

window.addEventListener('scroll',scrollTitle,false);
window.addEventListener("resize",changeFontSize,false);