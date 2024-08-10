// фукнция отрисовки комментариев
const renderComments = (commentsArray, loadedCommentsCount) => {
  const commentsList = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  let maxId = loadedCommentsCount + 5;

  if (maxId > commentsArray.length) {
    maxId = commentsArray.length;
  }

  for (let i = loadedCommentsCount; i < maxId; i++) {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = commentsArray[i].avatar;
    commentElement.querySelector('.social__picture').alt = commentsArray[i].name;
    commentElement.querySelector('.social__text').textContent = commentsArray[i].message;

    commentsList.append(commentElement);
  }
};

export { renderComments };
