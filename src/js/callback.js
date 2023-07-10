import { getAsked } from './get-api';
import { createMarkup } from './render-item';
import { getRefs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();

let pageNumber = 1;
let perPageGroupNumber = 1;
let perPage = 40;
let inputedData = '';

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

export const hendleOnSearchFormInput = async event => {
  if (!event.target.value.trim()) {
    return (refs.searchFormBtnSubmit.disabled = true);
  } else if (event.target.value.trim().length > 0) {
    return (refs.searchFormBtnSubmit.disabled = false);
  }
};

export const hendleSearchFormBtnSubmitClick = async event => {
  event.preventDefault();

  refs.galleryWrapper.innerHTML = '';
  inputedData = refs.formInputRef.value.trim();

  await getAsked(inputedData)
    .then(res => {
      const { hits, totalHits } = res.data;
      perPageGroupNumber = Math.ceil(totalHits / perPage);
      refs.loadMoreBtnSubmit.hidden = false;
      if (totalHits === 0) {
        refs.loadMoreBtnSubmit.hidden = true;
        refs.galleryWrapper.innerHTML = '';
        return Notify.failure(
          'Sorry. There are no images matching your search query. Please try again.'
        );
      } else if (perPageGroupNumber === pageNumber) {
        refs.loadMoreBtnSubmit.hidden = true;
        // refs.galleryWrapper.innerHTML = '';
        Notify.success(`Hooray.  We found  ${totalHits} images.`);
        refs.galleryWrapper.insertAdjacentHTML('beforeend', createMarkup(hits));
        return Notify.failure(
          `We're sorry, but you've reached the end of search results.`
        );
      }

      //   console.log(res);
      refs.galleryWrapper.insertAdjacentHTML('beforeend', createMarkup(hits));
      lightbox.refresh();
      return Notify.success(`Hooray.  We found  ${totalHits} images.`);
    })
    .catch(error => {
      return Notify.failure(
        `Oops! The operation cannot be completed, Error is ${error.message}`
      );
    });
};

export const hendleLoadMoreBtnClick = async () => {
  pageNumber += 1;

  getAsked(inputedData, pageNumber, perPage).then(response => {
    const { hits } = response.data;

    refs.galleryWrapper.insertAdjacentHTML('beforeend', createMarkup(hits));

    if (perPageGroupNumber === pageNumber) {
      refs.loadMoreBtnSubmit.hidden = true;
      return Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
};

//=================кнопка прокруутки
export const btnUp = {
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
