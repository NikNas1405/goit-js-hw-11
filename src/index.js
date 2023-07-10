import {
  hendleSearchFormBtnSubmitClick,
  hendleOnSearchFormInput,
  hendleLoadMoreBtnClick,
  btnUp,
} from './js/callback';

import { getRefs } from './js/refs';

const refs = getRefs();

refs.loadMoreBtnSubmit.hidden = true;
refs.searchFormBtnSubmit.disabled = true;
refs.galleryWrapper.innerHTML = '';

refs.formInputRef.addEventListener('input', hendleOnSearchFormInput);

refs.searchFormEl.addEventListener('submit', hendleSearchFormBtnSubmitClick);

refs.loadMoreBtnSubmit.addEventListener('click', hendleLoadMoreBtnClick);

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
