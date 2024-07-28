import { renderComments } from './comments.js';

// Реализован сценарий просмотра фотографий в полноразмерном режиме.
const renderFullsizePhoto = (object) => {
  const bigPicture = document.querySelector('.big-picture__img');
  const likesCount = document.querySelector('.likes-count');
  const commentsShownCount = document.querySelector('.social__comment-shown-count');
  const commentsTotalCount = document.querySelector('.social__comment-total-count');
  const socialCaption = document.querySelector('.social__caption');
  const loaderButton = document.querySelector('.social__comments-loader');
  const commentsArray = object[0].comments;
  let loadedCommentsCount = 0;

  bigPicture.querySelector('img').src = object[0].url;
  bigPicture.querySelector('img').alt = object[0].description;
  socialCaption.textContent = object[0].description;
  likesCount.textContent = object[0].likes;
  commentsTotalCount.textContent = object[0].comments.length;

  // отрисовка комментариев
  renderComments(commentsArray, loadedCommentsCount);

  if (commentsArray.length <= 5) {
    loaderButton.classList.add('hidden');
    loadedCommentsCount = commentsArray.length;
  } else {
    loadedCommentsCount = 5;
  }

  loaderButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(commentsArray, loadedCommentsCount);

    if (commentsArray.length - loadedCommentsCount < 5) {
      loadedCommentsCount += commentsArray.length - loadedCommentsCount;
    } else {
      loadedCommentsCount += 5;
    }

    commentsShownCount.textContent = loadedCommentsCount;

    console.log('колво загруженных комментов ' + loadedCommentsCount);
    console.log('колво комментов в массиве ' + commentsArray.length);
  });

  commentsShownCount.textContent = loadedCommentsCount;

  console.log('колво загруженных комментов ' + loadedCommentsCount);
  console.log('колво комментов в массиве ' + commentsArray.length);

  if (loadedCommentsCount === commentsArray.length) {
    loadedCommentsCount = 0;
    loaderButton.classList.add('hidden');
  };
};

export { renderFullsizePhoto }
