import { renderFullsizePhoto, openPhotoModal } from './fullsize.js';

// функция, отображающая фотографии других пользователей
const renderThumbnails = (picturesData) => {
  const thumbnailsCollection = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

  picturesData.forEach((picture) => {
    const {url, description, likes, comments} = picture;
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

export { renderThumbnails };
