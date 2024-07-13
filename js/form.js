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

function validateComment (value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

pristine.addValidator(
  photoComment,
  validateComment,
  `до ${COMMENT_MAX_LENGTH} символов`
);

const validateTags = (value) => {
  const hashtags = value.trim().split(/\s+/);
  const regexp = /^#[a-zа-яё0-9]{1, 19}$/i;

  if (hashtags.length === 0) {
    return true;
  }
  if (hashtags.length > HASHTAGS_MAX) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!regexp.test(hashtag)) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

pristine.addValidator(
  tagsField,
  validateTags,
  'неверный формат хэштега'
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// да хэш-тег начинается с символа # (решётка);
// да строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// да хеш-тег не может состоять только из одной решётки;
// да максимальная длина одного хэш-тега 20 символов, включая решётку;
// да хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
// да один и тот же хэш-тег не может быть использован дважды;
// да нельзя указать больше пяти хэш-тегов;

//onDocumentKeydown сделать универсальным и вынести в утилс?
