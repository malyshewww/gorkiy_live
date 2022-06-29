const workemailList = document.querySelectorAll('.workemail');
workemailList.forEach((item) => {
   item.value = '';
   item.removeAttribute('required');
});
// Маска для телефона
(function () {
   function mask(phone) {
      var code = '+7',
         find = /\+7/;
      code = '+';
      find = /\+/;
      phone.addEventListener('focus', function () {
         phone.value = code + " " + phone.value.replace(code + ' ', '');
      });
      phone.addEventListener('input', function () {
         var val = phone.value.replace(find, ''),
            res = code + " ";
         val = val.replace(/[^0-9]/g, '');

         for (var i = 0; i < val.length; i++) {
            //res+= i===0?' ':'';
            res += i === 1 ? ' (' : '';
            res += i == 4 ? ') ' : '';
            res += i == 7 || i == 9 ? ' ' : '';
            if (i == 11) break;
            res += val[i];
         }

         phone.value = res;
      });
      phone.addEventListener('blur', function () {
         var val = phone.value.replace(find, '');
         val = val.trim();
         if (!val) phone.value = null;
      });
   }

   var phone = document.querySelectorAll('[data-number]');

   if (phone) {
      var i = phone.length;

      while (i--) {
         mask(phone[i]);
      }
   }

   return true;
})();

const modalForm = document.querySelectorAll('.js-form');
// const closeModalBtn = document.querySelector('.js-close');
const formAllInputs = document.querySelectorAll('.form__input, .form__textarea')

// Отправка формы
modalForm.forEach(el => {
   el.addEventListener('submit', (event) => {
      event.preventDefault();
      const thisForm = event.target;
      const formData = new FormData(thisForm);
      // кнопка отправить
      const buttonSubmit = thisForm.querySelector('.form__button');

      const buttonSubmitText = buttonSubmit.textContent
      buttonSubmit.setAttribute('disabled', 'true');
      buttonSubmit.classList.add('disabled')
      buttonSubmit.textContent = 'идет отправка...';

      fetch('/formhandler', {
         method: 'POST',
         body: formData,
      })
         // "status" в modx
         .then((response) => response.json())
         .then((result) => {
            const inputName = thisForm.querySelector('input[name="name"]');
            const inputPhone = thisForm.querySelector('input[name="phone"]');
            const inputEmail = thisForm.querySelector('input[name="email"]');
            const inputMessage = thisForm.querySelector('textarea[name="message"]');
            if (result.status == "success") {
               // Вызывыаем модальку об успехе
               // modals.close()

               // modals.open('notice');
               // const modal = document.querySelector([data - graph - target="notice"])
               // const notice = modal.querySelector('.form__notice')
               // notice.textContent = 'Сообщение успешно отправлено!'
               if (inputName) {
                  inputName.value = '';
               }
               if (inputPhone) {
                  inputPhone.value = '';
               }
               if (inputEmail) {
                  inputEmail.value = '';
               }
               if (inputMessage) {
                  inputMessage.value = '';
               }
            } else {
               if (result.name) {
                  inputName.classList.add('error');
                  inputName.setAttribute('title', result.name.trim());
               }
               if (result.phone) {
                  inputPhone.classList.add('error');
                  inputPhone.setAttribute('title', result.phone.trim());
               }
               if (result.email) {
                  inputPhone.classList.add('error');
                  inputPhone.setAttribute('title', result.email.trim());
               }
               if (result.message) {
                  inputMessage.setAttribute('title', result.message.trim());
               }
            }
            buttonSubmit.removeAttribute('disabled');
            buttonSubmit.classList.remove('disabled');
            buttonSubmit.textContent = buttonSubmitText;
         }).catch((error) => {

            // modals.close()
            // modals.open('notice');
            // const modal = document.querySelector([data - graph - target="notice"])
            // const notice = modal.querySelector('.form__notice')
            // notice.textContent = 'При отправке произошла ошибка, попробуйте еще раз'
            buttonSubmit.removeAttribute('disabled');
            buttonSubmit.classList.remove('disabled')
            buttonSubmit.textContent = buttonSubmitText;
         });
   })
})