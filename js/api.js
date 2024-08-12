const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = () => fetch(BASE_URL + Route.GET_DATA)
  .then((response) => response.json());

const sendData = (onSuccess, onFail, body) => {
  fetch(
    BASE_URL + Route.SEND_DATA,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(onFail());
    }
  })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
