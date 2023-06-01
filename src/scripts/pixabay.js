import Notiflix from 'notiflix';
import { API_PATH, DEFAULT_PIXABAY_PARAMS } from './config.js';

export default async function pingPixabay({ q = '', page = '1', per_page = 40}) {
  try {
    const querystring = new URLSearchParams({
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
      per_page
    });

    const response = await fetch(`${API_PATH}?${querystring}`);
    if (!response.ok) {
      if (response.status === 400) {
        return [];
      }
      return { error: response.status };
    }
    const { hits: photos, totalHits } = await response.json();
    if (photos.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    console.log(photos);
    return { photos, totalHits };
  } catch (e) {
    return { error: e.toString() };
  }
}