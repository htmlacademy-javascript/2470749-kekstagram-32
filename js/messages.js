import { isEscapeKey } from './util';
import { onDocumentEscKeyDown } from './upload-form';
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
const closeSuccessMessageByEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
};

const closeSuccessMessageByClickOnDocument = (evt) => {
  if (evt.target === document.querySelector('.success')) {
    removeSuccessMessage();
  }
};

function removeSuccessMessage() {
  successMessage.remove();
  document.removeEventListener('click', closeSuccessMessageByClickOnDocument);
  document.removeEventListener('keydown', closeSuccessMessageByEsc);
}

const showPostSucsessMessage = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', closeSuccessMessageByEsc);
  document.addEventListener('click', closeSuccessMessageByClickOnDocument);
};

successButton.addEventListener('click', () => {
  removeSuccessMessage();
});

// показ сообщения об ошибке при отправке формы
const closeErrorMessageByEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }
};

const closeErrorMessageByClickOnDocument = (evt) => {
  if (evt.target === document.querySelector('.error')) {
    removeErrorMessage();
  }
};

function removeErrorMessage() {
  errorMessage.remove();
  document.addEventListener('keydown', onDocumentEscKeyDown);
  document.removeEventListener('keydown', closeErrorMessageByEsc);
  document.removeEventListener('click', closeErrorMessageByClickOnDocument);
}

const showPostErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', closeErrorMessageByEsc);
  document.addEventListener('click', closeErrorMessageByClickOnDocument);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
};

errorButton.addEventListener('click', () => {
  removeErrorMessage();
});

export { showGetDataError, showPostSucsessMessage, showPostErrorMessage };
