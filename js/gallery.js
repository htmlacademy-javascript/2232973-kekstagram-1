import { renderFullPhoto } from './fullphoto.js';
import { renderThumbnails } from './thumbnails.js';

const picturesList = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  picturesList.addEventListener('click', (evt) => {
    evt.preventDefault();
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === Number(thumbnail.dataset.id)
    );
    renderFullPhoto(picture);
  });

  renderThumbnails(pictures, picturesList);
};

export {renderGallery};
