import { renderThumbnails, showPhotosSortingSection, showDefaultPhotos, showRandomPhotos, showDiscussedPhotos } from './thumbnails.js';
import './fullsize.js';
import './upload-form.js';
import { getData } from './api.js';
import { showGetDataError } from './messages';

try {
  const picturesData = await getData();
  renderThumbnails(picturesData);
  showPhotosSortingSection();
  showDefaultPhotos(picturesData);
  showRandomPhotos(picturesData);
  showDiscussedPhotos(picturesData);
} catch {
  showGetDataError();
}
