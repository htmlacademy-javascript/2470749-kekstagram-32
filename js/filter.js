// реализовано наложение эффекта на изображение, слайдер:
const effectsSettings = {
  NONE: {
    effect: 'none',
  },
  CHROME: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    type: '',
  },
  SEPIA: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    type: '',
  },
  MARVIN: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    type: '%',
  },
  PHOBOS: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    type: 'px',
  },
  HEAT: {
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
const photoPreview = document.querySelector('.img-upload__preview');

// функция для базовых настроек, необходимых для дальнейшего отображения слайдера и превью фото
const imgPreviewStartSettings = () => {
  effectLevel.value = '0';
  photoPreview.style.filter = 'none';
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
const addFilter = (intenseValue) => {
  const chosenFilterName = photoPreview.dataset.filter;
  if (typeof chosenFilterName !== 'undefined') {
    const effectName = effectsSettings[chosenFilterName].effect;
    const effectType = effectsSettings[chosenFilterName].type;
    photoPreview.style.filter = `${effectName }(${ intenseValue }${effectType })`;
  }
};

// получаем значения слайдера и при изменении положения ползунка передаем значение в value элемента
effectLevelSlider.noUiSlider.on('update', () => {
  effectLevel.value = effectLevelSlider.noUiSlider.get();
  addFilter(effectLevel.value);
});

// изменяем параметры слайдера при клике на каждый фильтр
effectItemInputs.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const chosenFilterName = evt.target.value.toUpperCase();
    photoPreview.dataset.filter = chosenFilterName;
    const chosenEffectSettings = effectsSettings[chosenFilterName];

    if (chosenFilterName === 'NONE') {
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

export { imgPreviewStartSettings }
