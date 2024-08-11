import { renderFullsizePhoto, openPhotoModal } from './fullsize.js';
import { getRandomIntegerArray } from './util.js';

const imagesFilter = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

// 5.3. При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз 500 мс (устранение дребезга).

// функция для получения массива рандомных 10 фотографий из исходного массива
const getRandomPhotosArray = (picturesData, photosCount) => {
  const randomIndexArray = getRandomIntegerArray(0, picturesData.length - 1);
  const randomPhotosArray = [];

  for (let i = 0; i < photosCount; i++) {
    const randomIndex = randomIndexArray[i];
    const newElement = picturesData[randomIndex];
    randomPhotosArray.push(newElement);
  }
  return randomPhotosArray;
}

// функция для сравнения элементов с помощью метода sort
const comparePhotos = (photoDataA, photoDataB) => photoDataB.comments.length - photoDataA.comments.length;

// функция для получения отсортированного массива фотографий
const getSortedPhotosArray = (picturesData) => {
  const picturesDataCopy = picturesData.slice();
  const sortedPhotosArray = picturesDataCopy.sort(comparePhotos);
  return sortedPhotosArray;
}

// функция для показа фильтра фотографий
const showImagesSortingSection = () => {
  imagesFilter.classList.remove('img-filters--inactive');
};

// функция, отображающая фотографии других пользователей
const renderThumbnails = (picturesData) => {
  const thumbnailsCollection = document.querySelector('.pictures');
  const thumbnailsArray = thumbnailsCollection.querySelectorAll('a');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

  picturesData.forEach((picture) => {
    const { url, description, likes, comments } = picture;
    const thumbnailElement = thumbnailTemplate.cloneNode(true);

    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__img').alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

    // открытие фото при клике на миниатюру
    thumbnailElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPhotoModal();
      renderFullsizePhoto(picture);
    });

    thumbnailsArray.forEach((thumbnail) => thumbnail.remove());
    thumbnailsCollection.append(thumbnailElement);
  });
};

const showRandomPhotos = (picturesData) => {
  randomFilterButton.addEventListener('click', () => {
    const randomPhotosArray = getRandomPhotosArray(picturesData, 10);
    renderThumbnails(randomPhotosArray);
  });
};

const showDiscussedPhotos = (picturesData) => {
  discussedFilterButton.addEventListener('click', () => {
    const sortedPhotosArray = getSortedPhotosArray(picturesData);
    renderThumbnails(sortedPhotosArray);
  });
};

const showDefaultPhotos = (picturesData) => {
  defaultFilterButton.addEventListener('click', () => {
    renderThumbnails(picturesData);
  });
};

export { renderThumbnails, showImagesSortingSection, showRandomPhotos, showDefaultPhotos, showDiscussedPhotos };
