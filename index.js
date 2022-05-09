import anime from './jslib/animejs/lib/anime.es.js';

function toBottom() {
    window.scroll({
        top: window.innerHeight,
        behavior: "smooth"
    });
}

window.addEventListener('scroll', function(){
    let title = document.getElementById('title')
    let value = window.scrollY;
    title.style.top = 'calc(20vh + ' + value + '*0.2px)';
})