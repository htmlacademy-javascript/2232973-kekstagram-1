import { COMMENT_MAX_LENGTH, HASHTAGS_MAX } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const tagsField = document.querySelector('.text__hashtags');
const photoComment = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateComment (value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

pristine.addValidator(
  photoComment,
  validateComment,
  `до ${COMMENT_MAX_LENGTH} символов`
);

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

Object.keys(hashtagValidations).forEach((key) => {
  pristine.addValidator(
    tagsField,
    (value) => {
      const hashtags = value.trim().split(/\s+/).filter((tag) => tag !== '');
      if (key === 'uniqueTags' || key === 'maxTags') {
        return hashtagValidations[key].test(hashtags);
      }
      return hashtags.every((tag) => hashtagValidations[key].test(tag));
    },
    hashtagValidations[key].errorMessage
  );
});

const resetValidation = () => {
  pristine.reset();
};

const isValid = () => pristine.validate();

export { resetValidation, isValid };
