import { searchForPhotos, scrollHandler } from './handlers.js';
import { resetAvailablePhotos } from './ui.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-form__input');

searchForm.addEventListener('submit', searchForPhotos);
searchInput.addEventListener('blur', resetAvailablePhotos)
searchForm.dispatchEvent(new Event('submit'));
window.addEventListener('scroll', scrollHandler);
