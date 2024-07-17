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

  for (let i = 0; i < max; i++) {
    let newElement = getRandomInteger(min, max);
    randomIntegerArray.forEach((element) => {
      if (element === newElement) {
        newElement = getRandomInteger(min, max);
      }
    });
    randomIntegerArray.push(newElement);
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

export { getRandomInteger, getRandomIntegerArray, getRandomArrayElement, createGenerator };
