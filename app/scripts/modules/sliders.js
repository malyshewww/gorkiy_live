import Swiper, { Navigation, Pagination } from 'swiper';
function initSliders() {
   // PROGRAMMS SLIDER
   const programmSlider = document.querySelector('.slider-programm');
   if (programmSlider) {
      const programmSlides = programmSlider.querySelectorAll('.slider-programm__item').length;
      if (programmSlides > 3) {
         const programmSwiper = new Swiper(programmSlider, {
            modules: [Navigation, Pagination],
            loop: true,
            slidesPerView: 4,
            spaceBetween: 20,
            wrapperClass: "slider-programm__wrapper",
            slideClass: "slider-programm__item",
            simulateTouch: true,
            navigation: {
               nextEl: '.slider-programm__controls .arrow-next',
               prevEl: '.slider-programm__controls .arrow-prev',
            },
            pagination: {
               el: ".slider-programm__pagination",
            },
         });
      } else {
         programmSlider.classList.add('disabled');
      }
   }
}

window.addEventListener("load", (e) => {
   // Запуск инициализации слайдеров
   initSliders();
});