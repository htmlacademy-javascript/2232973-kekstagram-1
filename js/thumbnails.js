const picturesList = document.querySelector('.pictures');
const pictureCardTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({url, likes, comments}) => {
  const thumbnail = pictureCardTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const picturesListFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    picturesListFragment.appendChild(createThumbnail(picture));
  });
  picturesList.appendChild(picturesListFragment);
};

export {renderThumbnails};
