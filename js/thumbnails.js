import { renderFullPhoto } from './fullphoto.js';

const picturesList = document.querySelector('.pictures');
const pictureCardTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (picture) => {
  const {url, likes, comments} = picture;
  const thumbnail = pictureCardTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.addEventListener('click', () => {
    renderFullPhoto(picture);
  });
  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const picturesListFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    picturesListFragment.appendChild(thumbnail);
  });
  picturesList.appendChild(picturesListFragment);
};

export {renderThumbnails, picturesList};
