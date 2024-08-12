// вывод и закрытие окон об ошибке или сообщения об успешной отправке формы
const SHOW_GET_DATA_ERROR_TIME = 5000;

const dataErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

// ошибка загрузки данных с сервера
const showGetDataError = () => {
  document.body.appendChild(dataErrorMessage);

  setTimeout(() =>{
    dataErrorMessage.remove();
  },SHOW_GET_DATA_ERROR_TIME);
};

// показ сообщения об успешной отправке формы
const closeUploadSuccessMessageByEsc = (evt) => {
  evt.preventDefault();
  successMessage.remove();
};

const showPostSucsessMessage = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', closeUploadSuccessMessageByEsc);
};

successButton.addEventListener('click', () => {
  successMessage.remove();
  document.removeEventListener('keydown', closeUploadSuccessMessageByEsc);
});

// показ сообщения об ошибке при отправке формы
const closeUploadErrorMessageByEsc = (evt) => {
  evt.preventDefault();
  errorMessage.remove();
};

const showPostErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', closeUploadErrorMessageByEsc);
};

errorButton.addEventListener('click', () => {
  errorMessage.remove();
  document.removeEventListener('keydown', closeUploadSuccessMessageByEsc);
});

export {showGetDataError, showPostSucsessMessage, showPostErrorMessage };
