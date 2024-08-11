import { renderThumbnails, showImagesSortingSection, showDefaultPhotos, showRandomPhotos, showDiscussedPhotos, getRandomPhotosArray, getSortedPhotosArray } from './thumbnails.js';
import './fullsize.js';
import './upload-form.js';
import { getData } from './api.js';
import { showGetDataError } from './messages';
// import { debounce } from './util.js';

getData()
  .then((picturesData) => {
    renderThumbnails(picturesData),
      showImagesSortingSection(),
      showDefaultPhotos(picturesData),
      showRandomPhotos(picturesData),
      showDiscussedPhotos(picturesData);
  })
  .catch(() => {
    showGetDataError();
  });
