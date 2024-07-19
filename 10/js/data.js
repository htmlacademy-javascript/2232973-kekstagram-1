import {getRandomInteger, getRandomArrayElement, generatePhotoId, generateCommentId, generateURL} from './util.js';
import {COMMENTS, NAMES, LIKES_MIN, LIKES_MAX, COMMENTS_MIN, COMMENTS_MAX, AVATAR_START, AVATAR_END} from './constants.js';


const generateComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_START, AVATAR_END)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const generatePhotoData = () => ({
  id: generatePhotoId(),
  url: `photos/${generateURL()}.jpg`,
  description: 'Описание для фото',
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({ length: getRandomInteger(COMMENTS_MIN, COMMENTS_MAX) }, generateComments)
});

const createCards = (number) => Array.from(
  { length: number },
  generatePhotoData
);

export {createCards};
