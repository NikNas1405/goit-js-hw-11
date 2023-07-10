import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38138009-0f6c3d6b3a80b2eb535996fd8';

export async function getAsked(inputedData, pageNumber, perPage) {
  const options = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${inputedData}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: pageNumber,
    per_page: perPage,
  });
  try {
    return await axios.get(`${BASE_URL}?${options}`);
  } catch (error) {
    Notify.info(
      'Sorry.',
      'There are no images matching your search query. Please try again.',
      'Okay'
    );
  }
}




// const getAsked = async inputedData => {
//   return await axios.get(`${BASE_URL}`, {
//     params: {
//       key: API_KEY,
//       q: inputedData,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: pageCounter,
//       per_page: perPage,
//     },
//   });
// };
