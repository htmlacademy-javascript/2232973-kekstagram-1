import { renderFullPhoto } from './fullphoto.js';
import { renderThumbnails } from './thumbnails.js';

const picturesListElement = document.querySelector('.pictures');
const localPictures = [];

picturesListElement.addEventListener('click', (evt) => {
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

const clearGallery = () => {
  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

const renderGallery = (pictures) => {
  clearGallery();
  localPictures.length = 0;
  localPictures.push(...pictures.slice());
  renderThumbnails(pictures, picturesListElement);
};

export {renderGallery};
