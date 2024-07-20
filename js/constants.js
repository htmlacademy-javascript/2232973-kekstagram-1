const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 10;
const AVATAR_START = 1;
const AVATAR_END = 6;
const COMMENTS_TO_RENDER = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX = 5;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

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

const hashtagValidations = {
  startsWithHash: {
    test: (tag) => tag.startsWith('#'),
    errorMessage: 'Хэштег должен начинаться с символа #'
  },
  validCharacters: {
    test: (tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag),
    errorMessage: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы и т.д.'
  },
  maxLength: {
    test: (tag) => tag.length <= 20,
    errorMessage: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
  },
  uniqueTags: {
    test: (tags) => new Set(tags).size === tags.length,
    errorMessage: 'Один и тот же хэш-тег не может быть использован дважды'
  },
  maxTags: {
    test: (tags) => tags.length <= HASHTAGS_MAX,
    errorMessage: 'Нельзя указать больше пяти хэш-тегов'
  }
};

const effectSettings = {
  'none': {
    class: '',
    filter: '',
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: true,
  },
  'chrome': {
    class: 'effects__preview--chrome',
    filter: (value) => `grayscale(${value})`,
    sliderOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
    hidden: false,
  },
  'sepia': {
    class: 'effects__preview--sepia',
    filter: (value) => `sepia(${value})`,
    sliderOptions: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
    hidden: false,
  },
  'marvin': {
    class: 'effects__preview--marvin',
    filter: (value) => `invert(${value}%)`,
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: false,
  },
  'phobos': {
    class: 'effects__preview--phobos',
    filter: (value) => `blur(${value}px)`,
    sliderOptions: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
    hidden: false,
  },
  'heat': {
    class: 'effects__preview--heat',
    filter: (value) => `brightness(${value})`,
    sliderOptions: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
    hidden: false,
  },
};

export { hashtagValidations, effectSettings, COMMENTS, NAMES, LIKES_MIN, LIKES_MAX, COMMENTS_MIN, COMMENTS_MAX, AVATAR_START, AVATAR_END, COMMENTS_TO_RENDER, COMMENT_MAX_LENGTH, HASHTAGS_MAX, SCALE_MIN, SCALE_MAX, SCALE_STEP};
