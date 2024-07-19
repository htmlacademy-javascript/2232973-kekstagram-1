import { renderFullPhoto } from './fullphoto.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';

const picturesList = document.querySelector('.pictures');
const localPictures = [];

picturesList.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = localPictures.find(
    (item) => item.id === Number(thumbnail.dataset.id)
  );
  renderFullPhoto(picture);
});

const renderGallery = (pictures) => {
  localPictures.length = 0;
  localPictures.push(...pictures.slice());
  renderThumbnails(pictures, picturesList);
};

export {renderGallery};
