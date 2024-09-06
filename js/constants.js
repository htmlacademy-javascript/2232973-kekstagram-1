const COMMENTS_TO_RENDER = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX = 5;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const RANDOM_PHOTOS_COUNT = 10;
const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const MAX_HASHTAG_LENGTH = 20;
const SCALE_FACTOR = 0.01;
const RANDOM_FACTOR = 0.5;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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
    test: (tag) => tag.length <= MAX_HASHTAG_LENGTH,
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

const SubmitStatus = {
  STAND_BY: 'Опубликовать',
  SENDING: 'Отправка...',
};

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

export {
  hashtagValidations,
  effectSettings,
  SubmitStatus,
  Filters,
  Route,
  Method,
  COMMENTS_TO_RENDER,
  COMMENT_MAX_LENGTH,
  HASHTAGS_MAX,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_STEP,
  RANDOM_PHOTOS_COUNT,
  FILE_TYPES,
  BASE_URL,
  SCALE_FACTOR,
  RANDOM_FACTOR,
};
