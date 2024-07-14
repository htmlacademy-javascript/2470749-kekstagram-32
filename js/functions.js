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

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN:

// имяФункции('2023 год');            // 2023
// имяФункции('ECMAScript 2022');     // 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007');           // 7
// имяФункции('а я томат');           // NaN

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

getNumbers('0029 of June 2024 year');

/*
Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.
Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
/*
имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:0', '10:0', '8:0', 120);     // true
имяФункции('08:00', '14:30', '14:00', 90); // false
имяФункции('14:00', '17:30', '08:0', 90);  // false
имяФункции('8:00', '17:30', '08:00', 900); // false
*/

const isMeetingOnWorkingDay = (startWork, endWork, startMeeting, meetingLength) => {
  const getModifiedTime = (time) => {
    const array = time.split(':');
    const modifiedTime = Number(array.join('.'));
    return modifiedTime;
  };

  const convertMinutesInHours = (minutes) => {
    const array = [Math.floor(minutes / 60), minutes - Math.floor(minutes / 60) * 60];
    const timeInHours = Number(array.join('.'));
    return timeInHours;
  };

  const startWorkModified = getModifiedTime(startWork);
  const endWorkModified = getModifiedTime(endWork);
  const endOfMeeting = getModifiedTime(startMeeting) + convertMinutesInHours(meetingLength);
  let result;

  if (endOfMeeting - startWorkModified >= 0 && endWorkModified - endOfMeeting >= 0) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

isMeetingOnWorkingDay('08:00', '14:30', '14:00', 90);
