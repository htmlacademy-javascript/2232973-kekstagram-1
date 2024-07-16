import { isEscapeKey } from './util.js';
import { COMMENT_MAX_LENGTH, HASHTAGS_MAX } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileUpload = document.querySelector('#upload-file');
const popupUpload = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const tagsField = document.querySelector('.text__hashtags');
const photoComment = document.querySelector('.text__description');

fileUpload.addEventListener('change', () => {
  popupUpload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
});

const resetForm = () => {
  fileUpload.value = '';
  tagsField.value = '';
  photoComment.value = '';
};

const closeForm = () => {
  popupUpload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

closeButton.addEventListener('click', () => {
  closeForm();
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === photoComment || document.activeElement === tagsField) {
      return;
    }
    closeForm();
  }
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// function validateComment (value) {
//   return value.length <= COMMENT_MAX_LENGTH;
// }

pristine.addValidator(
  photoComment,
  (value) => {
    if (value.length <= COMMENT_MAX_LENGTH) {
      return true;
    }
    return 'слишком длинный коммени';
  });

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

