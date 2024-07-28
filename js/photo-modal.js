import { isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');

const onDocumentEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function openPhotoModal() {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEscKeyDown);
}

function closePhotoModal() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  const commentsListArray = document.querySelectorAll('.social__comment');
  commentsListArray.forEach((element) => element.remove());

  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

// закрытие фото при нажатии на кнопку крестик в модальном окне
closeModalButton.addEventListener('click', () => {
  closePhotoModal();
});

export { openPhotoModal };


