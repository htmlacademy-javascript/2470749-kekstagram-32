import { getRandomArrayElement, getRandomInteger } from './util.js';

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

export {getPhotoComment};
