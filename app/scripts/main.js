// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru

import "./modules/sliders.js";

import "./modules/dynamic_adapt.js";

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
const playRadio = document.getElementById("playRadio");
const audioPlayerWrapper = document.querySelector(".player");
const closeRadio = document.getElementById("closeRadio");
const audioPlayer = audioPlayerWrapper.querySelector(".player-audio");

playRadio.addEventListener("click", togglePlay);
function togglePlay() {
   playRadio.classList.toggle('active');
   audioPlayerWrapper.classList.add("show-player");
   if (audioPlayer.paused && playRadio.classList.contains('active')) {
      audioPlayer.play();
   }
   else {
      audioPlayer.pause();
   }
}
closeRadio.addEventListener("click", (event) => {
   closeRadio.closest(".player").classList.remove("show-player");
   playRadio.classList.remove('active');
   if (audioPlayer.play()) {
      audioPlayer.pause();
   }
})
