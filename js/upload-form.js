import { isEscapeKey } from './util.js';
import { imgPreviewStartSettings } from './filter.js';
import { sendData } from './api.js';

const HASHTAGS_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadModalButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const textCommentField = document.querySelector('.text__description');
const noneFilterItem = document.querySelector('#effect-none');
const plusScaleButton = document.querySelector('.scale__control--bigger');
const minusScaleButton = document.querySelector('.scale__control--smaller');
const scale = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview');
const submitButton = document.querySelector('.img-upload__submit');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const isFieldFocused = () => document.activeElement === textCommentField || document.activeElement === hashtagField;

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEscKeyDown);
};

// очистка данных формы после отправки на сервер:
const clearFormData = () => {
  uploadInput.value = '';
  hashtagField.value = '';
  textCommentField.value = '';
  noneFilterItem.checked = true;
  imgPreviewStartSettings();
  scale.value = 100 + '%';
  photoPreview.style.transform = 'scale(' + scale.value + ')';
}

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadInput.value = '';

  clearFormData();

  document.removeEventListener('keydown', onDocumentEscKeyDown);
};

function onDocumentEscKeyDown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeUploadModal();
  }
}

// открытие окна загрузки фото
uploadInput.addEventListener('change', openUploadModal);

// закрытие окна загрузки фото
closeUploadModalButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadModal();
});

// валидация:
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// проверка количества хэштегов:
const checkHashtagsArrayLength = (value) => {
  const hashtagsArray = value.trim().split(' ');

  return hashtagsArray.length === 0 || hashtagsArray.length <= MAX_HASHTAGS_COUNT;
};

// проверка повторяющихся хэштегов:
const checkHashtagsRepeat = (value) => {
  const hashtagsArray = value.trim().split(' ');

  const modifiedHashtagArray = hashtagsArray.map((hashtag) => {
    const modifiedHashtag = hashtag.replaceAll(' ', '').toLowerCase();
    return modifiedHashtag;
  });

  for (let i = 0; i < modifiedHashtagArray.length; i++) {
    if (modifiedHashtagArray.length === 1) {
      return true;
    } else {
      return modifiedHashtagArray.every((element) => element !== modifiedHashtagArray[i]);
    }
  }
};

// проверка корректности введения символов хэштега:
const checkHashtagsRegister = (value) => {
  const hashtagsArray = value.trim().split(' ');

  if (value === '') {
    return true;
  } else {
    return hashtagsArray.every((element) => HASHTAGS_REGEXP.test(element));
  }
};

// проверка длины комментария:
const checkCommentLength = (value) => value.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator(hashtagField, checkHashtagsArrayLength, 'Максимум 5 хэштегов');
pristine.addValidator(hashtagField, checkHashtagsRepeat, 'Выявлены повторяющиеся хэштеги');
pristine.addValidator(hashtagField, checkHashtagsRegister, 'Введены недопустимые символы');
pristine.addValidator(textCommentField, checkCommentLength, 'Длина комментария не более 140 символов');

// показ сообщения об успешной отправке формы
const closeUploadSuccessMessageByEsc = (evt) => {
  evt.preventDefault();
  successMessage.remove();
  clearFormData();
}

const showPostSucsessMessage = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', closeUploadSuccessMessageByEsc);
}

successButton.addEventListener('click', () => {
  successMessage.remove();
  clearFormData();
})

// показ сообщения об ошибке при отправке формы
const closeUploadErrorMessageByEsc = (evt) => {
  evt.preventDefault();
  errorMessage.remove();
}

const showPostErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', closeUploadErrorMessageByEsc);
}

errorButton.addEventListener('click', () => {
  errorMessage.remove();
})

// отправка формы на сервер, если все данные введены корректно:
const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const formData = new FormData(evt.target);

      fetch(
        'https://32.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then((response) => {
        if (response.ok) {
          onSuccess();
          showPostSucsessMessage();
        } else {
          showPostErrorMessage();
        }
      })
        .catch(() => {
          showPostErrorMessage();
        });
    }
  });
};

setUploadFormSubmit(closeUploadModal);

// реализовано изменение размера изображения при нажатии на кнопки + и -
plusScaleButton.addEventListener('click', () => {
  const currentScaleValue = parseInt(scale.value, 10);

  if (currentScaleValue < MAX_SCALE) {
    scale.value = `${currentScaleValue + SCALE_STEP}%`;
    photoPreview.style.transform = `scale(${scale.value})`;
  }
});

minusScaleButton.addEventListener('click', () => {
  const currentScaleValue = parseInt(scale.value, 10);

  if (currentScaleValue > MIN_SCALE) {
    scale.value = `${currentScaleValue - SCALE_STEP}%`;
    photoPreview.style.transform = `scale(${scale.value})`;
  }
});

export { setUploadFormSubmit };
