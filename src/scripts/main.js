import { searchForPhotos, scrollHandler } from './handlers.js';
import { resetAvailablePhotos } from './ui.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-form__input');
const searchButton = document.querySelector('button[type=submit]');
searchButton.addEventListener = ('click', searchForPhotos)
searchInput.addEventListener('blur', resetAvailablePhotos)
window.addEventListener('scroll', scrollHandler);


