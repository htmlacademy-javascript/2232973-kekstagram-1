import { renderGallery } from './gallery.js';
import './form.js';


fetch('https://28.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((posts) => renderGallery(posts))
  .catch((err) => {
    throw new Error(err);
  });
