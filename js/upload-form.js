import { isEscapeKey } from "./util";

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadModalButton = document.querySelector('.img-upload__cancel');

const onDocumentEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

function openUploadModal() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  console.log(uploadInput.value);
  document.addEventListener('keydown', onDocumentEscKeyDown);
}

function closeUploadModal() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadInput.value = '';

  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

// открытие окна загрузки фото
uploadInput.addEventListener('change', () => {
  openUploadModal();
});

// закрытие окна загрузки фото
closeUploadModalButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadModal();
});


