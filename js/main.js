// В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов.
// Каждый объект массива — описание фотографии, опубликованной пользователем.
// Структура каждого объекта должна быть следующей:

// id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
// Количество комментариев к каждой фотографии — случайное число от 0 до 30.
// Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
//
// {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }

// У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.
// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.

const DESCRIPTION = [
  'Всем привет! Давно меня здесь не было. Вот новая фоточка :)',
  'Красота!',
  'Закаты летом шикарные!',
  'Выходные возле бассейна',
  'Это я сижу и изучаю JavaScript',
  'Праздничный ужин',
  'Красивый завтрак! В стиле kekstagram!',
  'Я на даче. Хорошо тут на свежем воздухе гулять :)',
  'Сходил за грибами. Вот мой улов!',
  'Цветы на бабушкиной грядке просто загляденье!',
  'У меня сегодня день рождения! Принимаю поздравления!',
  'Как же хочется спать.. и кто придумал вставать в такую рань?',
  'А я иду, шагаю по Москве!',
  'Поделитесь списком классных фильмов к просмотру, прошу!',
  'Хм, ну и жара на улице.. как не расплавиться в +30?',
  'Сходили на выставку',
  'У меня так много фотографий накопилось, спешу поделиться с подписчиками',
  'Пикник на природе',
  'Сижу за ноутбуком, пока все отдыхают. Зато я уже на третьем модуле и скоро стану фронтендером :D',
  'А вы любите сырники, так, как их люблю я?',
  'Ляляляляля',
  'Фото без подписи',
  'Это я с семьей',
  'Вот и фотографии со свадьбы друзей',
  'Лето - это маленькая жизнь'
];

const NAMES = [
  'Денис',
  'Артем',
  'Мария',
  'Анна',
  'Евгений',
  'Кирилл',
  'Лолита',
  'Жанна',
  'Михаил',
  'Марина',
  'Татьяна',
  'Светлана',
  'Дмитрий',
  'Константин',
  'Ирина',
  'Ангелина',
  'Матвей',
  'Егор',
  'Глеб',
  'Ольга',
  'Олег',
  'Вероника',
  'Полина',
  'София',
  'Никита'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const LOADED_PHOTOS_COUNT = 25;

// функция, которая генерирует случайное число в диапазоне от a до b
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция, которая создает массив из рандомных чисел таким образом, чтобы эти числа не повторялись в массиве
const makeRandomIntegerArray = (min, max) => {
  const array = [getRandomInteger(min, max)];
  let newElement = getRandomInteger(min, max);

  for (let i = 0; i <= max; i++) {
    array.forEach((value) => {
      if (value === newElement) {
        newElement = getRandomInteger(min, max);
      }
    });
    array.push(newElement);
  }
  return array;
};

const photosIdArray = makeRandomIntegerArray(1, LOADED_PHOTOS_COUNT);
const photosUrlArray = makeRandomIntegerArray(1, LOADED_PHOTOS_COUNT);
const commentsIdArray = makeRandomIntegerArray(0, 750);

// функция, которая выбирает случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// функция генерирует комментарий из одного или двух предложений из списка MESSAGE
const createRandomCommentMessage = (quantity) => {
  const messageArray = [getRandomArrayElement(MESSAGE)];
  let newElement = getRandomArrayElement(MESSAGE);

  for (let i = 1; i < quantity; i++) {
    messageArray[i] !== newElement ? messageArray.push(newElement) : newElement = getRandomArrayElement(MESSAGE);
  }

  return messageArray.join(' ');
};

// функция, которая создает объект с информации об одном комментарии (задается порядковый номер комментария)
const getLoadedPhotoComment = (number) => ({
  id: commentsIdArray[number],
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createRandomCommentMessage(getRandomInteger(1, 2)),
  name: getRandomArrayElement(NAMES),
});

const makeLoadedPhotoCommentsArray = (quantity) => {
  const array = [];
  for (let i = 0; i < quantity; i++) {
    array.push(getLoadedPhotoComment(i));
  }
  return array;
};

// идея такая: мы передаем номер фото допустим 1 и тогда берем из массива id первый элемент массива, записываем его в id и тд по аналогии по порядку
// функция, которая создает объект с информацией об одной загруженной фотографии
const getLoadedPhotoData = (number) => ({
  id: photosIdArray[number],
  url: `photos/${photosUrlArray[number]}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: makeLoadedPhotoCommentsArray(getRandomInteger(0, 30)),
});

// функция, которой задаешь количество фото и она формирует массив данных об этих фотографий с помощью функции getLoadedPhotoData
const makeLoadedPhotosDataArray = (quantity) => {
  const array = [];
  for (let i = 0; i < quantity; i++) {
    array.push(getLoadedPhotoData(i));
  }
  return array;
};

makeLoadedPhotosDataArray(LOADED_PHOTOS_COUNT);
