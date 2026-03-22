import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
let totalHits = 0;
let loadedImages = 0;

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.search.value.trim();
  if (!query) return;

  clearGallery();
  hideLoadMoreButton();
  page = 1;
  loadedImages = 0;

  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    loadedImages += data.hits.length;

    if (data.hits.length === 0) {
      iziToast.error({ title: 'Error', message: 'No images found!' });
      return;
    }

    createGallery(data.hits);

    if (loadedImages < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton(); // 🔹 ховаємо кнопку перед запитом
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    loadedImages += data.hits.length;

    createGallery(data.hits);

    if (loadedImages >= totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton(); // 🔹 показуємо знову, якщо ще є сторінки
    }

    smoothScroll(); // 🔹 викликаємо завжди після успішного завантаження
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery li')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
