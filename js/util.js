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

export { getRandomInteger, getRandomIntegerArray, isEscapeKey, debounce };
