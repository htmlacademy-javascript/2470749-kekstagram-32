const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = (onSuccess, onFail) => {
  fetch(BASE_URL + route.GET_DATA)
  .then((response) => response.json())
  .then((picturesData) => {
    onSuccess(picturesData);
  })
  .catch(() => {
    onFail();
  });
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    BASE_URL + route.SEND_DATA,
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
