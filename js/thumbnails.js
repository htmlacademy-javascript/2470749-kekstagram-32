import { getPhotosDataArray } from './data';

// функция, отображающая фотографии других пользователей.
const pictures = getPhotosDataArray();

const renderThumbnails = () => {
  const thumbnailsCollection = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content;

  pictures.forEach((picture) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);

    thumbnailElement.querySelector('.picture__img').src = picture.url;
    thumbnailElement.querySelector('.picture__img').alt = picture.description;
    thumbnailElement.querySelector('.picture__likes').textContent = picture.likes;
    thumbnailElement.querySelector('.picture__comments').textContent = picture.comments.length;

    thumbnailsCollection.append(thumbnailElement);
  });
};

export { renderThumbnails, pictures };
