import { getRandomInteger, getRandomIntegerArray, getRandomArrayElement } from './util.js';

// Функуция, которая гененирует массив с информацией о загруженных фотографиях

const DESCRIPTIONS = [
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

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const LOADED_PHOTOS_COUNT = 25;

// функция генерирует ID с учетом других ID чтобы они не повторялись (замыкание)
const createGenerator = () => {
  let numberId = 1;

  return () => {
    numberId += 1;
    return numberId;
  };
};

const generateRandomId = createGenerator();

// функция генерирует комментарий из одного или двух предложений из списка MESSAGE
const createRandomCommentMessage = (quantity) => {
  const messageArray = [getRandomArrayElement(MESSAGES)];
  let newElement = getRandomArrayElement(MESSAGES);

  for (let i = 1; i < quantity; i++) {
    messageArray[i] !== newElement ? messageArray.push(newElement) : newElement = getRandomArrayElement(MESSAGES);
  }

  return messageArray.join(' ');
};

// функция, которая создает объект с информации об одном комментарии (задается порядковый номер комментария)
const getPhotoComment = () => ({
  id: generateRandomId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createRandomCommentMessage(getRandomInteger(1, 2)),
  name: getRandomArrayElement(NAMES),
});

const photosIdArray = getRandomIntegerArray(1, LOADED_PHOTOS_COUNT);
const photosUrlArray = getRandomIntegerArray(1, LOADED_PHOTOS_COUNT);

// идея такая: мы передаем номер фото допустим 1 и тогда берем из массива id первый элемент массива, записываем его в id и тд по аналогии по порядку
// функция, которая создает объект с информацией об одной загруженной фотографии
const getPhotoData = (number) => ({
  id: photosIdArray[number],
  url: `photos/${photosUrlArray[number]}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0,30)}, getPhotoComment),
});

// функция, которой задаешь количество фото и она формирует массив данных об этих фотографий с помощью функции getLoadedPhotoData
const getPhotosDataArray = (quantity) => {
  const array = [];
  for (let i = 0; i < quantity; i++) {
    array.push(getPhotoData(i));
  }
  return array;
};

export { getPhotosDataArray, LOADED_PHOTOS_COUNT };
