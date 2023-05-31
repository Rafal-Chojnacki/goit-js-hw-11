import { loadPhotos } from './ui.js';

export async function searchForPhotos(e) {
  e.preventDefault();

  e.target.page.value = '1';
  const q = e.target.searchQuery.value;

  await loadPhotos({ q, page: '1' });
}

export async function scrollHandler() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    const searchForm = document.querySelector('.search-form');
    const page = parseInt(searchForm.page.value);
    searchForm.page.value = page + 1;
    await loadPhotos({ q: searchForm.searchQuery.value, page: searchForm.page.value });
  }
}
