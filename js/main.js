import { renderGallery } from './gallery.js';
import { fetchData } from './fetch-initial-data.js';
import './form.js';

fetchData().then((pictures) => {
  renderGallery(pictures);
});
