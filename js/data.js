import {getRandomInteger, getRandomArrayElement, generatePhotoId, generateCommentId, generateURL} from './util.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 10;
const AVATAR_START = 1;
const AVATAR_END = 6;
const SIMILAR_CARDS_NUMBER = 25;

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

const similarCards = Array.from(
  { length: SIMILAR_CARDS_NUMBER },
  generatePhotoData
);

export {similarCards};
