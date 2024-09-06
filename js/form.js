import { setEscapeControl, removeEscapeControl } from './escape-control.js';
import { isValid, resetValidation } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showMessage } from './fetch-message.js';
import { SubmitStatus, FILE_TYPES } from './constants.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const previewElement = document.querySelector('.img-upload__preview img');
const fileUploadElement = document.querySelector('#upload-file');
const popupUploadElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('#upload-cancel');
const submitButtonElement = document.querySelector('#upload-submit');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');
const tagsFieldElement = document.querySelector('.text__hashtags');
const photoCommentElement = document.querySelector('.text__description');

const canBeClosed = () => !(document.activeElement === photoCommentElement || document.activeElement === tagsFieldElement);

const openForm = () => {
  popupUploadElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  setEscapeControl(closeForm, canBeClosed);
};

fileUploadElement.addEventListener('change', () => {
  openForm();
  const file = fileUploadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
    effectsPreviewElements.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});

const resetForm = () => {
  uploadFormElement.reset();
  resetValidation();
  resetScale();
  resetEffects();
};

resetForm();

closeButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
  removeEscapeControl();
});

const setSubmitStatus = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = SubmitStatus[isDisabled ? 'SENDING' : 'STAND_BY'];
};

const onSuccess = () => {
  closeForm();
  removeEscapeControl();
  showMessage('success');
};

const onError = () => {
  showMessage('error');
};

const onFinally = () => {
  setSubmitStatus(false);
};

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    const formData = new FormData(uploadFormElement);
    setSubmitStatus(true);
    sendData(formData, onSuccess, onError, onFinally);
  }
});

function closeForm() {
  popupUploadElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetForm();
}

