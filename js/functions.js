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

// Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число. Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:

// имяФункции(2023); // 2023
// имяФункции(-1);   // 1
// имяФункции(1.5);  // 15

