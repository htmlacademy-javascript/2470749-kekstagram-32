import { getRandomInteger, getRandomIntegerArray, getRandomArrayElement } from './util.js';
import { getPhotoComment } from './get-comment.js';

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

const LOADED_PHOTOS_COUNT = 25;

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
