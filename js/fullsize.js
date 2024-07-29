import { renderComments } from './comments.js';
const SHOWN_COMMENTS_COUNT = 5;

// Реализован сценарий просмотра фотографий в полноразмерном режиме.
const renderFullsizePhoto = (object) => {
  const bigPicture = document.querySelector('.big-picture__img');
  const likesCount = document.querySelector('.likes-count');
  const commentsShownCount = document.querySelector('.social__comment-shown-count');
  const commentsTotalCount = document.querySelector('.social__comment-total-count');
  const socialCaption = document.querySelector('.social__caption');
  const loaderButton = document.querySelector('.social__comments-loader');
  const commentsArray = object[0].comments;

  bigPicture.querySelector('img').src = object[0].url;
  bigPicture.querySelector('img').alt = object[0].description;
  socialCaption.textContent = object[0].description;
  likesCount.textContent = object[0].likes;
  commentsTotalCount.textContent = object[0].comments.length;

  // отрисовка комментариев:
  let loadedCommentsCount = 0;

  renderComments(commentsArray, loadedCommentsCount);

  if (commentsArray.length <= SHOWN_COMMENTS_COUNT) {
    loaderButton.classList.add('hidden');
    loadedCommentsCount = commentsArray.length;
  } else {
    loadedCommentsCount = SHOWN_COMMENTS_COUNT;
  }

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
      loadedCommentsCount = 0;
      loaderButton.classList.add('hidden');
    };
  });

  commentsShownCount.textContent = loadedCommentsCount;
};

export { renderFullsizePhoto }
