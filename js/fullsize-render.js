import { renderComments } from "./comments-render";

// Реализован сценарий просмотра фотографий в полноразмерном режиме.
const renderFullsizePhoto = (object) => {
  const bigPicture = document.querySelector('.big-picture__img');
  const likesCount = document.querySelector('.likes-count');
  const commentsShownCount = document.querySelector('.social__comment-shown-count');
  const commentsTotalCount = document.querySelector('.social__comment-total-count');
  const socialCaption = document.querySelector('.social__caption');
  const comments = object[0].comments;
  let shownCommentsCount = 2;

  bigPicture.querySelector('img').src = object[0].url;
  bigPicture.querySelector('img').alt = object[0].description;
  socialCaption.textContent = object[0].description;
  likesCount.textContent = object[0].likes;

  if (object[0].comments.length < shownCommentsCount) {
    shownCommentsCount = object[0].comments.length;
  }

  commentsShownCount.textContent = shownCommentsCount;
  commentsTotalCount.textContent = object[0].comments.length;

  renderComments(comments);
};

export { renderFullsizePhoto };
