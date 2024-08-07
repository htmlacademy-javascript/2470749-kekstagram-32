import { isEscapeKey } from './util.js';

const HASHTAGS_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENTS_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadModalButton = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const textCommentField = document.querySelector('.text__description');

const isFieldFocused = () => document.activeElement === textCommentField || document.activeElement === hashtagField;

const onDocumentEscKeyDown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEscKeyDown);
};

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadInput.value = '';

  document.removeEventListener('keydown', onDocumentEscKeyDown);
};

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
      return modifiedHashtagArray.every((element) => element !== modifiedHashtagArray[i])
    };
  };
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

// отправка формы, если все данные введены корректно:
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    evt.target.submit();
  }
});

// реализовано изменение размера изображения при нажатии на кнопки + и -
const plusScaleButton = document.querySelector('.scale__control--bigger');
const minusScaleButton = document.querySelector('.scale__control--smaller');
const scale = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview');

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

plusScaleButton.addEventListener('click', () => {
  const currentScaleValue = parseInt(scale.value);

  if (currentScaleValue < MAX_SCALE) {
    scale.value = (currentScaleValue + SCALE_STEP) + '%';
    photoPreview.style.transform = 'scale(' + scale.value + ')';
  }
});

minusScaleButton.addEventListener('click', () => {
  const currentScaleValue = parseInt(scale.value);

  if (currentScaleValue > MIN_SCALE) {
    scale.value = (currentScaleValue - SCALE_STEP) + '%';
    photoPreview.style.transform = 'scale(' + scale.value + ')';
  }
});
