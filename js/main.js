import { createCards } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './fullphoto.js';

renderThumbnails(createCards(25));

