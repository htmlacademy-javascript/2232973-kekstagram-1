import { SCALE_MIN, SCALE_MAX, SCALE_STEP } from './constants.js';

const imgScaleUp = document.querySelector('.scale__control--bigger');
const imgScaleDown = document.querySelector('.scale__control--smaller');
const imgScaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const resetScale = () => {
  imgScaleValue.value = `${SCALE_MAX}%`;
  imgPreview.style.transform = `scale(${SCALE_MAX / 100})`;
  imgPreview.style.filter = 'none';
};

const scaleUp = () => {
  const scaleValue = parseInt(imgScaleValue.value, 10);
  if (scaleValue >= SCALE_MAX) {
    return;
  }
  imgScaleValue.value = `${scaleValue + SCALE_STEP}%`;
  imgPreview.style.transform = `scale(${(scaleValue + SCALE_STEP) / 100})`;
};

const scaleDown = () => {
  const scaleValue = parseInt(imgScaleValue.value, 10);
  if (scaleValue <= SCALE_MIN) {
    return;
  }
  imgScaleValue.value = `${scaleValue - SCALE_STEP}%`;
  imgPreview.style.transform = `scale(${(scaleValue - SCALE_STEP) / 100})`;
};

imgScaleUp.addEventListener('click', scaleUp);
imgScaleDown.addEventListener('click', scaleDown);

export {resetScale};
