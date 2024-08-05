import { renderComments } from './comments.js';
import { isEscapeKey } from './util.js';

const SHOWN_COMMENTS_COUNT = 5;

const bigPictureModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const loaderButton = document.querySelector('.social__comments-loader');
let commentsArray;
let loadedCommentsCount;

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

  loaderButton.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

// закрытие фото в модальном окне
closeModalButton.addEventListener('click', () => {
  closePhotoModal();
});

// функция для просмотра фотографий в полноразмерном режиме
const renderFullsizePhoto = (object) => {
  const bigPicture = document.querySelector('.big-picture__img');
  const likesCount = document.querySelector('.likes-count');

  const commentsTotalCount = document.querySelector('.social__comment-total-count');
  const socialCaption = document.querySelector('.social__caption');

  commentsArray = object.comments;

  bigPicture.querySelector('img').src = object.url;
  bigPicture.querySelector('img').alt = object.description;
  socialCaption.textContent = object.description;
  likesCount.textContent = object.likes;
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

loaderButton.addEventListener('click', (evt) => {
  evt.preventDefault();
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
