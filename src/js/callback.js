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

  // if (!inputedData) {
  //   refs.loadMoreBtnSubmit.hidden = true;
  //   return Notify.failure(`We're sorry, but you didn't set search terms`);
  // }

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
      let lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
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
    let lightbox = new SimpleLightbox('.gallery a', {
      doubleTapZoom: '1.2',
      captionsData: 'data-parent',
      captionDelay: 250,
    });

    lightbox.refresh();
    if (perPageGroupNumber === pageNumber) {
      refs.loadMoreBtnSubmit.hidden = true;
      return Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
};
