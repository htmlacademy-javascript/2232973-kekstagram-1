import { isEscapeKey } from './util.js';

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
    closeForm();
  }
}

//onDocumentKeydown сделать универсальным и вынести в утилс?
