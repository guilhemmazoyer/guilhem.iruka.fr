import anime from './jslib/animejs/lib/anime.es.js';

let anim = true;

window.addEventListener('scroll', function(){
    let title = document.getElementById('title')
    let value = window.scrollY;

    title.style.top = 'calc(15vh + ' + value + '*0.6px)';

    if(anim && value >= 300){
        anim = false;
        anime({
            targets: '.un',
            translateX: function(el, i) {
                return 25;
              },
            translateY: function(el, i) {
                return 50;
              },
            scale: function(el, i) {
              return 1.5;
            },
            borderRadius: function(el) {
              return Math.random()*el.offsetWidth/2;
            },
            duration: function() { return anime.random(1500, 2400); },
            delay: function() { return anime.random(0, 500); }
          });

          anime({
            targets: '.deux',
            translateX: function(el, i) {
                return -50;
              },
            translateY: function(el, i) {
                return -50;
              },
            scale: function(el, i) {
              return 1.2;
            },
            borderRadius: function(el) {
              return Math.random()*el.offsetWidth/2;
            },
            duration: function() { return anime.random(1000, 2000); },
            delay: function() { return anime.random(200, 600); }
          });

          anime({
            targets: '.trois',
            translateX: function(el, i) {
                return -250;
              },
            translateY: function(el, i) {
                return 200;
              },
            scale: function(el, i) {
              return 1.7;
            },
            borderRadius: function(el) {
              return Math.random()*el.offsetWidth/2;
            },
            duration: function() { return anime.random(1500, 2000); },
            delay: function() { return anime.random(500, 750); }
          });

          anime({
            targets: '.quatre',
            translateX: function(el, i) {
                return -50;
              },
            translateY: function(el, i) {
                return 125;
              },
            scale: function(el, i) {
              return 1.3;
            },
            borderRadius: function(el) {
              return Math.random()*el.offsetWidth/2;
            },
            duration: function() { return anime.random(1500, 2000); },
            delay: function() { return anime.random(500, 750); }
          });

          anime({
            targets: '.cv',
            translateX: function(el, i) {
                return 100;
              },
            translateY: {
              value: -200,
              duration: 1200
            },
            rotate: {
              value: 360,
              duration: 1000,
              easing: 'easeInOutSine'
            },
            scale: {
              duration: 1600,
              delay: 800,
              easing: 'easeInOutQuart'
            },
            delay: 250 // All properties except 'scale' inherit 250ms delay
          });
    }
})