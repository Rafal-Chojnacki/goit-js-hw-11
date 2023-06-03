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

const infoTable = document.createElement("table");
infoTable.className = 'gallery__info-table'

// Create the first row
const row1 = document.createElement("tr");

// Create the first cell in row 1
const cell1 = document.createElement("th");
cell1.textContent = "Likes";
row1.appendChild(cell1);

// Create the second cell in row 1
const cell2 = document.createElement("th");
cell2.textContent = "Views";
row1.appendChild(cell2);

// Create the third cell in row 1
const cell3 = document.createElement("th");
cell3.textContent = "Comments";
row1.appendChild(cell3);

// Create the fourth cell in row 1
const cell4 = document.createElement("th");
cell4.textContent = "Downloads";
row1.appendChild(cell4);

// Append the first row to the table
infoTable.appendChild(row1);

// Create the second row
const row2 = document.createElement("tr");

// Create the first cell in row 2
const cell5 = document.createElement("td");
cell5.textContent = `${photo.likes}`
row2.appendChild(cell5);

// Create the second cell in row 2
const cell6 = document.createElement("td");
cell6.textContent = `${photo.views}`;
row2.appendChild(cell6);

// Create the third cell in row 2
const cell7 = document.createElement("td");
cell7.textContent = `${photo.comments}`;
row2.appendChild(cell7);

// Create the fourth cell in row 2
const cell8 = document.createElement("td");
cell8.textContent = `${photo.downloads}`;
row2.appendChild(cell8);

// Append the second row to the table
infoTable.appendChild(row2);

// Append the table to the infoDiv element
infoDiv.appendChild(infoTable);


    
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
      'We are sorry, but you have reached the end of search results.'
    );
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
  Notiflix.Notify.success(`Hooray! We found ${hits} images.`);
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
