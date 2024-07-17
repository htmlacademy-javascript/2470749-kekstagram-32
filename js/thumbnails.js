// Отобразить фотографии других пользователей.
// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

import { getPhotosDataArray } from './data';

const createPictures = () => {
  const pictures = getPhotosDataArray();
  const picturesCollection = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;

  const picturesCollectionFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesCollection.append(pictureElement);
  });

  picturesCollection.append(picturesCollectionFragment);
};

export { createPictures };
