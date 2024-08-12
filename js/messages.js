import { isEscapeKey } from "./util";
import { onDocumentEscKeyDown } from "./upload-form";
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

  setTimeout(() => {
    dataErrorMessage.remove();
  }, SHOW_GET_DATA_ERROR_TIME);
};

// показ сообщения об успешной отправке формы
const closeUploadSuccessMessageByEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessage.remove();
  }
};

const closeSuccessMessageByClickOnDocument = (evt) => {
  if (evt.target === document.querySelector('.success')) {
    successMessage.remove();
    document.removeEventListener('keydown', closeUploadSuccessMessageByEsc);
  }
}

const showPostSucsessMessage = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', closeUploadSuccessMessageByEsc);

  document.addEventListener('click', closeSuccessMessageByClickOnDocument);
};

successButton.addEventListener('click', () => {
  successMessage.remove();
  document.removeEventListener('keydown', closeUploadSuccessMessageByEsc);
});

// показ сообщения об ошибке при отправке формы
const closeUploadErrorMessageByEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessage.remove();
  }
};

const closeErrorMessageByClickOnDocument = (evt) => {
  if (evt.target === document.querySelector('.error')) {
    errorMessage.remove();
    document.removeEventListener('keydown', closeUploadErrorMessageByEsc);
  }
}

const showPostErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
  document.addEventListener('keydown', closeUploadErrorMessageByEsc);

  document.addEventListener('click', closeErrorMessageByClickOnDocument);
};

errorButton.addEventListener('click', () => {
  errorMessage.remove();
  document.removeEventListener('keydown', closeUploadSuccessMessageByEsc);
});

export { showGetDataError, showPostSucsessMessage, showPostErrorMessage };
