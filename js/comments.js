const renderComments = (commentsArray) => {
  const commentsList = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const commentsListArray = document.querySelectorAll('.social__comment');

  commentsListArray.forEach((element) => element.remove());

  commentsArray.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsList.append(commentElement);
  });
};

export { renderComments };
