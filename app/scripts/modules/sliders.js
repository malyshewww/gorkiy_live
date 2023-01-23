import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
function initSliders() {
   // PROGRAMMS SLIDER
   const programmSlider = document.querySelector('.slider-programm');
   if (programmSlider) {
      const programmSlides = programmSlider.querySelectorAll('.slider-programm__item').length;
      if (programmSlides > 4) {
         const programmSwiper = new Swiper(programmSlider, {
            modules: [Navigation, Autoplay, Pagination],
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
            autoplay: {
               delay: 5000,
               stopOnLastSlide: false,
               disableOnInteraction: true
            },
            pagination: {
               el: ".slider-programm__pagination",
               type: "bullets",
               clickable: true
            },
            breakpoints: {
               300: {
                  slidesPerView: 1,
               },
               479.98: {
                  slidesPerView: 2,
               },
               767.98: {
                  slidesPerView: 3,
               },
               991.98: {
                  slidesPerView: 4,
               }
            }
         });
      } else {
         programmSlider.classList.add('disabled');
         programmSlider.closest('.programm__wrapper').classList.add('gray-line');
      }
   }
   const homeSlider = document.querySelector('.slider-home__body');
   if (homeSlider) {
      const programmSwiper = new Swiper(homeSlider, {
         modules: [Navigation, Autoplay],
         autoHeight: true,
         loop: true,
         slidesPerView: 1,
         spaceBetween: 10,
         watchOverflow: true,
         wrapperClass: "slider-home__wrapper",
         slideClass: "slider-home__item",
         simulateTouch: true,
         navigation: {
            nextEl: '.slider-home__button-next',
            prevEl: '.slider-home__button-prev',
         },
         autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true
         },
         breakpoints: {
            300: {
               autoHeight: true,
            },
         }
      });

   }
}
initSliders();

// window.addEventListener("DOMContentLoaded", (e) => {
//    // Запуск инициализации слайдеров
//    initSliders();
// });