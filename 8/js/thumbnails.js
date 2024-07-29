import { getPhotosDataArray } from './data.js';
import { renderFullsizePhoto } from './fullsize.js';
import { openPhotoModal } from './photo-modal.js';

const pictures = getPhotosDataArray();

// функция, отображающая фотографии других пользователей
const renderThumbnails = () => {
  const thumbnailsCollection = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

  pictures.forEach((picture) => {
    const {url, description, likes, comments, id} = picture;
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

    thumbnailsCollection.append(thumbnailElement);
  });
};

export { renderThumbnails, pictures };
