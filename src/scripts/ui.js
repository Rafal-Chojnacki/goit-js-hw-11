import SimpleLightbox from 'simplelightbox';
import pingPixabay from './pixabay.js';

const getPhotoElement = photo => {
  const img = document.createElement('img');
  img.classList.add('photo-card');
  img.src = photo.webformatURL;
  img.alt = photo.tags;

  return img;
};
console.log(getPhotoElement);

function drawPhotos({ photos, page }) {
  const photoContainer = document.querySelector('.gallery');
  if (page === '1') {
    photoContainer.innerHTML = '';
  }

  for (const photo of photos) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'gallery__photo-card';
    const imgElement = document.createElement('img');
    imgElement.src = photo.webformatURL; // Set the image source URL
    imgElement.alt = photo.tags; // Set the alternative text for the image
    imgElement.setAttribute('loading', 'lazy'); // Set the 'loading' attribute to 'lazy'
    photoDiv.appendChild(imgElement);
    photoContainer.appendChild(photoDiv);
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    const viewsElement = document.createElement('h3');
    viewsElement.className = 'info-item';
    const viewsTextElement = document.createElement('p');
    viewsTextElement.textContent = `Views ${photo.views} `;
    viewsElement.appendChild(viewsTextElement);
    infoDiv.appendChild(viewsElement);
    photoDiv.appendChild(infoDiv);
    let lightbox = new SimpleLightbox('.gallery__photo-card a', {
        captionDelay: 250,
        captionsData: 'alt',
      });
  }
 
  
}

export async function loadPhotos({ q, page }) {
  const photos = await pingPixabay({ q, page });
  if (photos.error) {
    alert(photos.error);
    return;
  }
  drawPhotos({ photos, page });
  return;
}
