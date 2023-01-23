// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru

// Слайдеры
import "./modules/sliders.js";
// Динамический адаптив
import "./modules/dynamic_adapt.js";
// Форма
import "./modules/form.js";
// ServiceWorker for ios
import "./modules/sw-ios.js";

// MENU BURGER
const iconMenu = document.querySelector('.menu-header__icon');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
   iconMenu.addEventListener("click", function (event) {
      iconMenu.classList.toggle("active");
      menuBody.classList.toggle("show-menu");
      document.body.classList.toggle("lock");
   });
}
// AUDIO PLAYER
let radiolink;
if (!radiolink) radiolink = 'https://stream.live-fm.ru:8443/gorkylive/';

var radio = (() => {
   var btn = document.getElementById('playRadio');
   var closeBtn = document.getElementById('closeRadio')
   var player = document.querySelector('.player-audio')
   var sourceAudio = player.querySelector('source')
   var playerWrap = document.querySelector('.player')
   if (!btn) return;
   if (!player) return;
   var radio = {
      el: player,
      btn: btn,
      state: 'stop',
      play: function () {
         // sourceAudio.setAttribute('src', `${radiolink}?v=${Date.now()}`);
         this.el.load();
         if (player.paused) this.el.play();
         radio.state = 'play';
         this.btn.classList.add('active');
         playerWrap.classList.add('show-player');
      },
      pause: function () {
         if (!player.paused) this.el.pause();
         sourceAudio.setAttribute('src', `${radiolink}?v=${Date.now()}`);
         radio.state = 'pause';
         this.btn.classList.remove('active');
         playerWrap.classList.remove('show-player');
      },
      stop: function () {
         this.el.pause();
         sourceAudio.setAttribute('src', `${radiolink}`);
         radio.state = 'stop';
         this.btn.classList.remove('active');
         playerWrap.classList.remove('show-player');
      }
   };
   radio.el.volume = 0.5;
   player.onplay = () => {
      btn.classList.add('active');
   }
   player.onpause = () => {
      btn.classList.remove('active');
      sourceAudio.setAttribute('src', `${radiolink}?v=${Date.now()}`);
   }
   btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (player.paused) {
         btn.classList.add('active');
         playerWrap.classList.add('show-player');
         player.play()
      } else {
         btn.classList.remove('active');
         player.pause()
      }
   });
   closeBtn.addEventListener('click', () => {
      radio.stop();
   })
})();
