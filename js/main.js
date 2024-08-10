import { renderThumbnails } from './thumbnails.js';
import './fullsize.js';
import './upload-form.js';
import { getData } from './api.js';
import { showGetDataError } from "./messages";

getData(renderThumbnails, showGetDataError);
