import {
  hendleSearchFormBtnSubmitClick,
  hendleOnSearchFormInput,
  hendleLoadMoreBtnClick,
} from './js/callback';

import { getRefs } from './js/refs';

const refs = getRefs();

refs.loadMoreBtnSubmit.hidden = true;
refs.searchFormBtnSubmit.disabled = true;
refs.galleryWrapper.innerHTML = '';

refs.formInputRef.addEventListener('input', hendleOnSearchFormInput);

refs.searchFormEl.addEventListener('submit', hendleSearchFormBtnSubmitClick);

refs.loadMoreBtnSubmit.addEventListener('click', hendleLoadMoreBtnClick);




//=================кнопка прокруутки
const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
       scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector('.btn-up').onclick = () => {
            window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  },
};

btnUp.addEventListener();



// Прокручування сторінки
// Зробити плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень. Ось тобі код-підказка, але розберися у ньому самостійно.

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

// Нескінченний скрол
// Замість кнопки «Load more», можна зробити нескінченне завантаження зображень під час прокручування сторінки. Ми надаємо тобі повну свободу дій в реалізації, можеш використовувати будь-які бібліотеки.
