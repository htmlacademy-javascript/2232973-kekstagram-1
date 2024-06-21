import { createCards } from './data.js';

const renderedCards = createCards(25);

const picturesList = document.querySelector('.pictures');
const pictureCardTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

renderedCards.forEach(({url, likes, comments}) => {
  const pictureCard = pictureCardTemplate.cloneNode(true);
  pictureCard.querySelector('.picture__img').src = url;
  pictureCard.querySelector('.picture__likes').textContent = likes;
  pictureCard.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(pictureCard);
});

picturesList.appendChild(picturesListFragment);

export {picturesList};
