import { isEscapeKey } from './util.js';
import { resetImgPreviewSettings } from './photo-effect.js';
import { sendData } from './api.js';
import { showPostErrorMessage, showPostSucsessMessage } from './messages.js';

const HASHTAGS_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const SPACES_REGEXP = / +/g;
const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ScaleSettings = {
  STEP: 25,
  MAX: 100,
  MIN: 25,
};

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
const submitButton = document.querySelector('.img-upload__submit');
const photoPreviewImg = document.querySelector('.img-upload__preview img');
const effectsPreviewIcons = document.querySelectorAll('.effects__preview');

// валидация:
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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
  resetImgPreviewSettings();
  scale.value = `${100}%`;
  photoPreviewImg.style.transform = `scale(${scale.value})`;
  pristine.reset();
};

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearFormData();
  document.removeEventListener('keydown', onDocumentEscKeyDown);
};

function onDocumentEscKeyDown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeUploadModal();
  }
}

// функция для показа загруженной фотографии в модальном окне
const setLoadedPhotoPreview = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const filePath = URL.createObjectURL(file);
    photoPreviewImg.src = filePath;
    effectsPreviewIcons.forEach((icon) => {
      icon.style.backgroundImage = `url(${ filePath })`;
    });
  }
};

// открытие окна загрузки фото, загрузка фото:
uploadInput.addEventListener('change', () => {
  openUploadModal();
  setLoadedPhotoPreview();
});

// закрытие окна загрузки фото
closeUploadModalButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadModal();
});

// проверка количества хэштегов:
const checkHashtagsArrayLength = (value) => {
  const hashtagsArray = value.replace(SPACES_REGEXP, ' ').trim().split(' ');

  return hashtagsArray.length === 0 || hashtagsArray.length <= MAX_HASHTAGS_COUNT;
};

// проверка повторяющихся хэштегов:
const checkHashtagsRepeat = (value) => {
  const hashtagsArray = value.replace(SPACES_REGEXP, ' ').trim().split(' ');

  const modifiedHashtagArray = hashtagsArray.map((hashtag) => {
    const modifiedHashtag = hashtag.trim().toLowerCase();
    return modifiedHashtag;
  });

  return modifiedHashtagArray.length === new Set(modifiedHashtagArray).size;
};

// проверка корректности введения символов хэштега:
const checkHashtagsRegister = (value) => {
  const hashtagsArray = value.replace(SPACES_REGEXP, ' ').trim().split(' ');

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
pristine.addValidator(textCommentField, checkCommentLength, `Длина комментария не более ${ MAX_COMMENTS_LENGTH } символов`);

// отправка формы на сервер, если все данные введены корректно:
const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      submitButton.disabled = true;
      sendData(
        () => {
          onSuccess();
          submitButton.disabled = false;
          showPostSucsessMessage();
        },
        () => {
          submitButton.disabled = false;
          showPostErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

setUploadFormSubmit(closeUploadModal);

// реализовано изменение размера изображения при нажатии на кнопки + и -
plusScaleButton.addEventListener('click', () => {
  const currentScaleValue = parseInt(scale.value, 10);

  if (currentScaleValue < ScaleSettings.MAX) {
    scale.value = `${currentScaleValue + ScaleSettings.STEP}%`;
    photoPreviewImg.style.transform = `scale(${scale.value})`;
  }
});

minusScaleButton.addEventListener('click', () => {
  const currentScaleValue = parseInt(scale.value, 10);

  if (currentScaleValue > ScaleSettings.MIN) {
    scale.value = `${currentScaleValue - ScaleSettings.STEP}%`;
    photoPreviewImg.style.transform = `scale(${scale.value})`;
  }
});

export {onDocumentEscKeyDown};
