// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
// Эта функция нам пригодится для валидации формы.
const getStringLength = (string, maxLength) => string.length <= maxLength;

getStringLength('привет', 10);

// Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.

const isStringPalindrome = (string) => {
  const modifiedString = string.replaceAll(' ', '').toLowerCase();
  let result = 0;

  for (let i = 0; i <= modifiedString.length - 1; i++) {
    if (modifiedString[i] === modifiedString[modifiedString.length - i - 1]) {
      result++;
    }
  }

  return result === modifiedString.length;
};

isStringPalindrome('Лёша на полке клопа нашёл ');

// функция, которая модифицирует время в число, напр 8:30 = 8.3
const getModifiedTime = (time) => {
  const array = time.split(':');
  const modifiedTime = Number(array.join('.'));
  return modifiedTime;
};

// функция, которая переводит минуты в часы, напр 100 минут = 1.4
const convertMinutesInHours = (minutes) => {
  const timeInHours = Number(`${Math.floor(minutes / 60)}.${Math.floor(minutes % 60)}`);
  return timeInHours;
};

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN
const getNumbers = function (string) {
  const modifiedString = string.replaceAll(' ', '').toLowerCase();
  let result = '';

  for (let i = 0; i <= modifiedString.length; i++) {
    for (let j = 0; j <= 9; j++) {
      if (Number(modifiedString[i]) === j) {
        result += j;
      }
    }
  }
  result = Number(result);
  if (result === 0) {
    result = NaN;
  }
  return result;
};

getNumbers('Сегодня 22 июня 2024 года');
/*
функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
для проверки:
имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:00', '17:30', '08:00', 900); // false
*/
const isMeetingOnWorkingDay = (startWork, endWork, startMeeting, meetingLength) => {
  const startWorkModified = getModifiedTime(startWork);
  const endWorkModified = getModifiedTime(endWork);
  const endOfMeeting = getModifiedTime(startMeeting) + convertMinutesInHours(meetingLength);

  const result = endOfMeeting - startWorkModified >= 0 && endWorkModified - endOfMeeting >= 0;

  return result;
};

isMeetingOnWorkingDay('08:00', '17:30', '14:00', 90);
