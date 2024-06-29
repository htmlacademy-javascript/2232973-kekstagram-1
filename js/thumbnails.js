const pictureCardTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (picture) => {
  const {id, url, likes, comments} = picture;
  const thumbnail = pictureCardTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container) => {
  const picturesListFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    picturesListFragment.appendChild(thumbnail);
  });
  container.appendChild(picturesListFragment);
};

export {renderThumbnails};
