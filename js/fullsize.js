import { renderComments } from './comments.js';

const SHOWN_COMMENTS_COUNT = 5;

const commentsShownCount = document.querySelector('.social__comment-shown-count');
const loaderButton = document.querySelector('.social__comments-loader');
let commentsArray;
let loadedCommentsCount;

// Реализован сценарий просмотра фотографий в полноразмерном режиме.
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

export { renderFullsizePhoto };
