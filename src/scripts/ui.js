import pingPixabay from './pixabay.js';
import SimpleLightbox from 'simplelightbox';

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
  
  }
  let lightbox = new SimpleLightbox('.gallery__photo-card a', {
    captionDelay: 250,
  });
}
export async function loadMorePhotos() {
    const searchForm = document.querySelector('.search-form');
    const page = parseInt(searchForm.page.value);
    searchForm.page.value = page + 1;
    await loadPhotos({ q: searchForm.searchQuery.value, page: searchForm.page.value });
  };

export async function loadPhotos({ q, page }) {
  const photos = await pingPixabay({ q, page });
  if (photos.error) {
    alert(photos.error);
    return;
  }
  drawPhotos({ photos, page });
  return;
}


