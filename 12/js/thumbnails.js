import { renderFullsizePhoto, openPhotoModal } from './fullsize.js';
import { getRandomIntegerArray, debounce } from './util.js';

const SHOWN_PHOTOS_MAX_COUNT = 10;
const DEBOUNCE_TIME = 500;

const imagesFilter = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const changeFilterButtons = document.querySelectorAll('.img-filters__button');

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
};

// функция для сравнения элементов с помощью метода sort
const comparePhotos = (photoDataA, photoDataB) => photoDataB.comments.length - photoDataA.comments.length;

// функция для получения отсортированного массива фотографий
const getSortedPhotosArray = (picturesData) => {
  const picturesDataCopy = picturesData.slice();
  const sortedPhotosArray = picturesDataCopy.sort(comparePhotos);
  return sortedPhotosArray;
};

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

const changeButtonState = (evt) => {
  changeFilterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const renderFilteredThumbnails = debounce(renderThumbnails, DEBOUNCE_TIME);

// функция для отрисовки рандомных 10 фотографий
const showRandomPhotos = (picturesData) => {
  randomFilterButton.addEventListener('click', (evt) => {
    const randomPhotosArray = getRandomPhotosArray(picturesData, SHOWN_PHOTOS_MAX_COUNT);
    renderFilteredThumbnails(randomPhotosArray);
    changeButtonState(evt);
  });
};

// функция для отрисовки обсуждаемых фотографий (сортировка по убыванию количества комментариев к фото)
const showDiscussedPhotos = (picturesData) => {
  discussedFilterButton.addEventListener('click', (evt) => {
    const sortedPhotosArray = getSortedPhotosArray(picturesData);
    renderFilteredThumbnails(sortedPhotosArray);
    changeButtonState(evt);
  });
};

// функция для отрисовки исходного массива фотографий
const showDefaultPhotos = (picturesData) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    renderFilteredThumbnails(picturesData);
    changeButtonState(evt);
  });
};

export { renderThumbnails, showImagesSortingSection, showRandomPhotos, showDefaultPhotos, showDiscussedPhotos };
