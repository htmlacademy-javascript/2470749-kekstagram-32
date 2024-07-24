import { isEscapeKey, isEnterKey } from './util.js';
import { renderFullsizePhoto } from './fullsize.js';
import { pictures } from './thumbnails.js';

const bigPictureModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');
const thumbnails = document.querySelectorAll('.pictures');

const onDocumentEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function openPhotoModal() {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  document.addEventListener('keydown', onDocumentEscKeyDown);
}

function closePhotoModal() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

// открытие фото при клике на миниатюру (без клавиши enter)
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPhotoModal();
    // функция для получения URL миниатюры, на которую нажал пользователь, для отрисовки полной версии фото в модальном окне
    const getThumbnailUrl = () => {
      const thumbnailFullUrl = evt.target.src;
      let thumbnailId = thumbnailFullUrl.split('photos/');
      thumbnailId = thumbnailId[1].split('.');
      thumbnailId = thumbnailId[0];

      const thumbnailUrl = `photos/${thumbnailId}.jpg`;
      const photoDataObject = pictures.filter((el) => el.url === thumbnailUrl);

      return photoDataObject;
    };

    renderFullsizePhoto(getThumbnailUrl());
  });
});

// закрытие фото при нажатии на кнопку крестик в модальном окне + с помощью клавиши enter
closeModalButton.addEventListener('click', () => {
  closePhotoModal();
});

closeModalButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePhotoModal();
  }
});

