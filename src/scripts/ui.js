import pingPixabay from './pixabay.js';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const getPhotoElement = photo => {
  const imgLink = document.createElement('a');
  imgLink.classList.add('photo-card');
  imgLink.href = photo.largeImageURL;
  const img = document.createElement('img');
  img.src = photo.webformatURL;
  img.alt = photo.tags;
  imgLink.appendChild(img);
  return imgLink;
};

let lightbox = null;
function drawPhotos({ photos, page }) {
  const photoContainer = document.querySelector('.gallery');
  if (page === '1') {
    photoContainer.innerHTML = '';
  }
  for (const photo of photos) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'gallery__photo-card';
    photoDiv.appendChild(getPhotoElement(photo));
    photoContainer.appendChild(photoDiv);
    const infoDiv = document.createElement('div');
    infoDiv.className = 'gallery__info';
    photoDiv.appendChild(infoDiv);
    const likesDiv = document.createElement('div');
    likesDiv.className = 'gallery__info-item';
    const likesCount = document.createElement('span');
    likesCount.textContent = `Views ${photo.likes}`;
    likesDiv.appendChild(likesCount);
    infoDiv.appendChild(likesDiv);
    const viewsDiv = document.createElement('div');
    viewsDiv.className = 'gallery__info-item';
    const viewsCount = document.createElement('span');
    viewsCount.textContent = `Likes ${photo.views}`;
    viewsDiv.appendChild(viewsCount);
    infoDiv.appendChild(viewsDiv);
    const commentsDiv = document.createElement('div');
    commentsDiv.className = 'gallery__info-item';
    const commentsCount = document.createElement('span');
    commentsCount.textContent = `Comments ${photo.comments}`;
    commentsDiv.appendChild(commentsCount);
    infoDiv.appendChild(commentsDiv);
    const downloadsDiv = document.createElement('div');
    downloadsDiv.className = 'gallery__info-item';
    const downloadsCount = document.createElement('span');
    downloadsCount.textContent = `Downloads ${photo.downloads}`;
    downloadsDiv.appendChild(downloadsCount);
    infoDiv.appendChild(downloadsDiv);
    if (lightbox === null) {
      lightbox = new SimpleLightbox('.gallery__photo-card a', {
        captionDelay: 250,
      });
    }
  }
}
export async function loadMorePhotos() {
  const searchForm = document.querySelector('.search-form');
  const page = parseInt(searchForm.page.value);
  searchForm.page.value = page + 1;
  await loadPhotos({
    q: searchForm.searchQuery.value,
    page: searchForm.page.value,
  });
}
let numberOfPhotos = 0;
let hits = Infinity;
export async function loadPhotos({ q, page }) {
  if (numberOfPhotos >= hits) {
    const loadMoreButton = document.querySelector('.load-more');
    loadMoreButton.style.visibility = 'hidden';
    Notiflix.Notify.warning(
      'We are sorry, but you have reached the end of search results.');
    return;
  }
  const photosAvailable = hits - numberOfPhotos;
  const { photos, totalHits } = await pingPixabay({
    q,
    page,
    per_page: photosAvailable < 40 ? photosAvailable : 40,
  });
  hits = totalHits;
  numberOfPhotos += photos.length;
  console.log(numberOfPhotos);
  Notiflix.Notify.info(`Hooray! We found ${hits} images.`);
  if (photos.error) {
    alert(photos.error);
    return;
  }
  drawPhotos({ photos, page });
  lightbox.refresh();
  return;
}

export function resetAvailablePhotos() {
  numberOfPhotos = 0;
  hits = Infinity;
  console.log(numberOfPhotos);
}
