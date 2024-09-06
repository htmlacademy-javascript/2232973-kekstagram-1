import { setEscapeControl, removeEscapeControl } from './escape-control.js';
import { COMMENTS_TO_RENDER } from './constants.js';

const fullCardElement = document.querySelector('.big-picture');
const cardImageElement = fullCardElement.querySelector('.big-picture__img img');
const cardLikesElement = fullCardElement.querySelector('.likes-count');
const cardDescriptionElement = fullCardElement.querySelector('.social__caption');
const cardCommentsCountElement = fullCardElement.querySelector('.comments-count');
const shownCommentsCountElement = fullCardElement.querySelector('.social__comment-count');
const commentsBlockElement = document.querySelector('.social__comments');
const commentItemElement = commentsBlockElement.querySelector('.social__comment');
const commentsShowMoreElement = document.querySelector('.comments-loader');
const closePhotoButtonElement = document.querySelector('#picture-cancel');

let commentsShown = 0;
let localComments = [];

const createComment = ({ avatar, message, name }) => {
  const commentElement = commentItemElement.cloneNode(true);
  const imgElement = commentElement.querySelector('.social__picture');
  imgElement.src = avatar;
  imgElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  commentsShown += COMMENTS_TO_RENDER;

  if (commentsShown >= localComments.length) {
    commentsShowMoreElement.classList.add('hidden');
    commentsShown = localComments.length;
  } else {
    commentsShowMoreElement.classList.remove('hidden');
  }

  const commentsListFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(localComments[i]);
    commentsListFragment.append(commentElement);
  }

  commentsBlockElement.innerHTML = '';
  commentsBlockElement.append(commentsListFragment);
  shownCommentsCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${localComments.length}</span> комментариев`;
};

const onMoreCommentsClick = () => renderComments();

const closeFullPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');
  fullCardElement.classList.add('hidden');
  commentsShown = 0;
  commentsShowMoreElement.removeEventListener('click', onMoreCommentsClick);
};

const renderFullPhoto = ({ url, likes, comments, description }) => {

  document.querySelector('body').classList.add('modal-open');
  cardImageElement.src = url;
  cardLikesElement.textContent = likes;
  cardCommentsCountElement.textContent = comments.length;
  cardDescriptionElement.textContent = description;
  commentsBlockElement.innerHTML = '';
  localComments = comments;
  setEscapeControl(closeFullPhoto);
  renderComments();
  commentsShowMoreElement.addEventListener('click', onMoreCommentsClick);
  fullCardElement.classList.remove('hidden');
};

closePhotoButtonElement.addEventListener('click', () => {
  closeFullPhoto();
  removeEscapeControl();
});

export { renderFullPhoto };
