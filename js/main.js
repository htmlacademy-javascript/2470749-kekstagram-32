import { renderThumbnails } from './thumbnails.js';
import './fullsize.js';
import './upload-form.js';
import './filter.js';

const showError = () => {
  const dataErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');
  document.body.appendChild(dataErrorMessage);

  setTimeout(function(){
    dataErrorMessage.remove();
  }, 5000);
}

fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((picturesData) => {
    renderThumbnails(picturesData);
  })
  .catch(() => {
    showError();
  });
