import { SCALE_MIN, SCALE_MAX, SCALE_STEP } from './constants.js';

const imgScaleUp = document.querySelector('.scale__control--bigger');
const imgScaleDown = document.querySelector('.scale__control--smaller');
const imgScaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_MAX;
const resetScale = () => {
  imgScaleValue.value = `${SCALE_MAX}%`;
  imgPreview.style.transform = `scale(${SCALE_MAX / 100})`;
  imgPreview.style.filter = 'none';
  currentScale = SCALE_MAX;
};

const renderScale = () => {
  imgPreview.style.transform = `scale(${currentScale / 100})`;
  imgScaleValue.value = `${currentScale}%`;
};

const scaleUp = () => {
  currentScale = currentScale < SCALE_MAX ? currentScale + SCALE_STEP : SCALE_MAX;
  renderScale();
};

const scaleDown = () => {
  currentScale = currentScale > SCALE_MIN ? currentScale - SCALE_STEP : SCALE_MIN;
  renderScale();
};

imgScaleUp.addEventListener('click', scaleUp);
imgScaleDown.addEventListener('click', scaleDown);

export {resetScale};
