import { loadPhotos } from './ui.js';
import { loadMorePhotos } from './ui.js';

export async function searchForPhotos(e) {
  e.preventDefault();

  e.target.page.value = '1';
  const q = e.target.searchQuery.value;
  console.log(e);
  await loadPhotos({ q, page: '1' });
}

export async function scrollHandler() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    const loadMoreButton = document.querySelector('.load-more');
    loadMoreButton.style.visibility = 'visible';
    loadMoreButton.addEventListener('click', loadMorePhotos);
  }
}
