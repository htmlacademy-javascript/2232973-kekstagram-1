import { isEscapeKey } from './util.js';

const fullCard = document.querySelector('.big-picture');
const cardImage = fullCard.querySelector('.big-picture__img img');
const cardLikes = fullCard.querySelector('.likes-count');
const cardDescription = fullCard.querySelector('.social__caption');
const cardCommentsCount = fullCard.querySelector('.comments-count');
const shownCommentsCount = fullCard.querySelector('.social__comment-count');
const commentsBlock = document.querySelector('.social__comments');
const commentItem = commentsBlock.querySelector('.social__comment');
const commentsShowMore = document.querySelector('.comments-loader');
const closePhotoButton = document.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const renderFullPhoto = ({ url, likes, comments, description }) => {
  document.querySelector('body').classList.add('modal-open');
  cardImage.src = url;
  cardLikes.textContent = likes;
  cardCommentsCount.textContent = comments.length;
  cardDescription.textContent = description;

  commentsBlock.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const commentElement = commentItem.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsListFragment.appendChild(commentElement);
  });
  commentsBlock.appendChild(commentsListFragment);

  document.addEventListener('keydown', onDocumentKeydown);
  shownCommentsCount.classList.add('hidden');
  commentsShowMore.classList.add('hidden');
  fullCard.classList.remove('hidden');
};

const closeFullPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');
  fullCard.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

closePhotoButton.addEventListener('click', () => {
  closeFullPhoto();
});

export { renderFullPhoto };
