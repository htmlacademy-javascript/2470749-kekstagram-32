import { renderThumbnails, showImagesSortingSection, showDefaultPhotos, showRandomPhotos, showDiscussedPhotos } from './thumbnails.js';
import './fullsize.js';
import './upload-form.js';
import { getData } from './api.js';
import { showGetDataError } from './messages';

try {
  const picturesData = await getData();
  renderThumbnails(picturesData);
  showImagesSortingSection();
  showDefaultPhotos(picturesData),
  showRandomPhotos(picturesData),
  showDiscussedPhotos(picturesData);
} catch {
  showGetDataError();
}


// getData()
//   .then((picturesData) => {
//     renderThumbnails(picturesData),
//     showImagesSortingSection(),
//     showDefaultPhotos(picturesData),
//     showRandomPhotos(picturesData),
//     showDiscussedPhotos(picturesData);
//   })
//   .catch(() => {
//     showGetDataError();
//   });
