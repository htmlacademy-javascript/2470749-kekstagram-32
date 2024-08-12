// реализовано наложение эффекта на изображение, слайдер:
const effectsSettings = {
  none: {
    effect: 'none',
  },
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    type: '',
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    type: '',
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    type: '%',
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    type: 'px',
  },
  heat: {
    effect: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    type: '',
  },
};

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const imgEffectLevel = document.querySelector('.img-upload__effect-level');
const effectItemInputs = document.querySelectorAll('.effects__radio');
const photoPreviewImg = document.querySelector('.img-upload__preview img');

// функция для базовых настроек, необходимых для дальнейшего отображения слайдера и превью фото
const imgPreviewStartSettings = () => {
  effectLevel.value = '0';
  photoPreviewImg.style.filter = 'none';
  imgEffectLevel.classList.add('hidden');
};

imgPreviewStartSettings();

// функция для создания слайдера
const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
};

createSlider();

// функция добавляет элементу img фильтр в стили css
const addEffect = (intenseValue) => {
  const chosenEffectName = photoPreviewImg.dataset.filter;
  if (typeof chosenEffectName !== 'undefined') {
    const effectName = effectsSettings[chosenEffectName].effect;
    const effectType = effectsSettings[chosenEffectName].type;
    photoPreviewImg.style.filter = `${effectName }(${ intenseValue }${effectType })`;
  }
};

// получаем значения слайдера и при изменении положения ползунка передаем значение в value элемента
effectLevelSlider.noUiSlider.on('update', () => {
  effectLevel.value = effectLevelSlider.noUiSlider.get();
  addEffect(effectLevel.value);
});

// изменяем параметры слайдера при клике на каждый фильтр
effectItemInputs.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const chosenEffectName = evt.target.value;
    photoPreviewImg.dataset.filter = chosenEffectName;
    const chosenEffectSettings = effectsSettings[chosenEffectName];

    if (chosenEffectName === 'none') {
      imgPreviewStartSettings();
    } else {
      imgEffectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: chosenEffectSettings.min,
          max: chosenEffectSettings.max,
        },
        start: chosenEffectSettings.max,
        step: chosenEffectSettings.step,
      });
    }
  });
});

export { imgPreviewStartSettings };
