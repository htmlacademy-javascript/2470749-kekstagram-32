import { renderComments } from './comments.js';
import { isEscapeKey } from './util.js';

const SHOWN_COMMENTS_COUNT = 5;

const bigPictureModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const loaderButton = document.querySelector('.social__comments-loader');
const bigPicture = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsTotalCount = document.querySelector('.social__comment-total-count');
const socialCaption = document.querySelector('.social__caption');

let commentsArray;
let loadedCommentsCount;

const openPhotoModal = () => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeyDown);
};

const closePhotoModal = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  const commentsListArray = document.querySelectorAll('.social__comment');
  commentsListArray.forEach((element) => element.remove());

  loaderButton.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentEscKeyDown);
};

function onDocumentEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
}

// закрытие фото в модальном окне
const onCloseButtonClick = () => {
  closePhotoModal();
};

closeModalButton.addEventListener('click', onCloseButtonClick);

// функция для просмотра фотографий в полноразмерном режиме
const renderFullsizePhoto = (photoData) => {
  commentsArray = photoData.comments;

  bigPicture.querySelector('img').src = photoData.url;
  bigPicture.querySelector('img').alt = photoData.description;
  socialCaption.textContent = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsTotalCount.textContent = commentsArray.length;

  // отрисовка комментариев:
  loadedCommentsCount = 0;

  renderComments(commentsArray, loadedCommentsCount);

  if (commentsArray.length <= SHOWN_COMMENTS_COUNT) {
    loaderButton.classList.add('hidden');
    loadedCommentsCount = commentsArray.length;
  } else {
    loadedCommentsCount = SHOWN_COMMENTS_COUNT;
  }

  commentsShownCount.textContent = loadedCommentsCount;
};

loaderButton.addEventListener('click', () => {
  renderComments(commentsArray, loadedCommentsCount);

  if (commentsArray.length - loadedCommentsCount < SHOWN_COMMENTS_COUNT) {
    loadedCommentsCount += commentsArray.length - loadedCommentsCount;
  } else {
    loadedCommentsCount += SHOWN_COMMENTS_COUNT;
  }

  commentsShownCount.textContent = loadedCommentsCount;

  if (loadedCommentsCount === commentsArray.length) {
    loaderButton.classList.add('hidden');
  }
});

export { renderFullsizePhoto, openPhotoModal };
