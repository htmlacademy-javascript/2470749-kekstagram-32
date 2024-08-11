// функция, которая генерирует случайное число в диапазоне от a до b
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция, которая создает массив из рандомных чисел таким образом, чтобы эти числа не повторялись в массиве
const getRandomIntegerArray = (min, max) => {
  const randomIntegerArray = [];

  while (randomIntegerArray.length !== max) {
    let newElement = getRandomInteger(min, max);
    const result = randomIntegerArray.every((element) => element !== newElement);

    if (result) {
      randomIntegerArray.push(newElement);
    } else {
      newElement = getRandomInteger(min, max);
    }
  }
  return randomIntegerArray;
};

// функция, которая выбирает случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// функция генерирует ID с учетом других ID чтобы они не повторялись (замыкание)
const createGenerator = () => {
  let numberId = 1;

  return () => {
    numberId += 1;
    return numberId;
  };
};

// функция, которая возвращает true / false в зависимости от наличия или отсутствия нажатия клавиши esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// функция для вызова коллбэка через определенное время
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, getRandomIntegerArray, getRandomArrayElement, createGenerator, isEscapeKey, debounce };

