import { isEscapeKey } from './util.js';
import { isValid, resetValidation } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileUpload = document.querySelector('#upload-file');
const popupUpload = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const tagsField = document.querySelector('.text__hashtags');
const photoComment = document.querySelector('.text__description');

const openForm = () => {
  popupUpload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

fileUpload.addEventListener('change', () => {
  openForm();
});

const resetForm = () => {
  uploadForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
};

resetForm();

const closeForm = () => {
  popupUpload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

closeButton.addEventListener('click', () => {
  closeForm();
});

uploadForm.addEventListener('submit', (evt) => {
  if (!isValid()){
    evt.preventDefault();
  }
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement === photoComment || document.activeElement === tagsField) {
      return document.activeElement.blur();
    }
    closeForm();
  }
}
