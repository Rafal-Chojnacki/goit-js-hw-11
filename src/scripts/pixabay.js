import Notiflix from 'notiflix';
import { API_PATH, API_KEY, DEFAULT_PIXABAY_PARAMS } from './config.js';
axios.defaults.baseURL = API_PATH;

export default async function pingPixabay({
  q = '',
  page = '1',
  per_page = 40,
}) {
  try {
    const querystring = new URLSearchParams({
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
      per_page,
    });
    if (q === '') {
      Notiflix.Notify.info('Please ask about any image.');
      const photoContainer = document.querySelector('.gallery');
      photoContainer.innerHTML = '';
      return;
    }

    const response = await axios.get(
      `?key=${API_KEY}&q=${q}&${querystring.toString()}`
    );
    const data = await response.data;
    const photos = data.hits;
    const totalHits = data.totalHits;

    if (photos.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      const photoContainer = document.querySelector('.gallery');
      photoContainer.innerHTML = '';
      return;
    }

    return { photos, totalHits };
  } catch (e) {
    return { error: e.toString() };
  }
}
