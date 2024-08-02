import { isEscapeKey } from "./util";

const HASHTAGS_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadModalButton = document.querySelector('.img-upload__cancel');
const hashtags = document.querySelector('.text__hashtags');
const publishButton = document.querySelector('.img-upload__submit');

const onDocumentEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

function openUploadModal() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentEscKeyDown);
}

function closeUploadModal() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadInput.value = '';

  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

// открытие окна загрузки фото
uploadInput.addEventListener('change', () => {
  openUploadModal();
});

// закрытие окна загрузки фото
closeUploadModalButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadModal();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// ok хэштег начинается с символа # (решётка);
//ok  строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// ok хеш-тег не может состоять только из одной решётки;
// ok максимальная длина одного хэштега 20 символов, включая решётку;
// ok хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
//ok хэштеги разделяются пробелами;
// один и тот же хэштег не может быть использован дважды;
// ok нельзя указать больше пяти хэштегов;
// ok хэштеги необязательны;
// если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.


// проверка количества хэштегов:
const checkHashtagsArrayLength = (value) => {
  const hashtagsArray = value.trim().split(" ");

  if (hashtagsArray.length === 0 || hashtagsArray.length <= 5) {
    return true;
  } else {
    return false;
  }
}

// проверка повторяющихся хэштегов:
const checkHashtagsRepeat = (value) => {
  const hashtagsArray = value.trim().split(" ");
  console.log(hashtagsArray);

  const modifiedHashtagArray = hashtagsArray.map((hashtag) => {
    let modifiedHashtag = hashtag.replaceAll(' ', '').toLowerCase();
    return modifiedHashtag;
  });

  for (let i = 0; i < modifiedHashtagArray.length; i++) {
    if (modifiedHashtagArray.length === 1) {
      return true;
    } else if (modifiedHashtagArray.every((element) => element !== modifiedHashtagArray[i])) {
     return true;
    } else {
      return false;
    };
  };
};

// проверка корректности введения символов хэштега:
const checkHashtagsRegister = (value) => {
  const hashtagsArray = value.trim().split(' ');
  console.log(hashtagsArray);
  return hashtagsArray.every((element) => HASHTAGS_REGEXP.test(element));
};

pristine.addValidator(hashtags, checkHashtagsArrayLength, 'Максимум 5 хэштегов');
pristine.addValidator(hashtags, checkHashtagsRepeat, 'Выявлены повторяющиеся хэштеги');
pristine.addValidator(hashtags, checkHashtagsRegister, 'Хэштег содержит только # или введены недопустимые символы или длина хэштега превышает 20 символов или хэштеги должны разделяться пробелом');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
