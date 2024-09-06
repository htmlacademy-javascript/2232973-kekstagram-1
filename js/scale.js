import { SCALE_MIN, SCALE_MAX, SCALE_STEP, SCALE_FACTOR } from './constants.js';

const imgScaleUpElement = document.querySelector('.scale__control--bigger');
const imgScaleDownElement = document.querySelector('.scale__control--smaller');
const imgScaleValue = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_MAX;

const renderScale = () => {
  imgPreviewElement.style.transform = `scale(${currentScale * SCALE_FACTOR})`;
  imgScaleValue.value = `${currentScale}%`;
};

const resetScale = () => {
  currentScale = SCALE_MAX;
  renderScale();
};

const onScaleUpClick = () => {
  currentScale = currentScale < SCALE_MAX ? currentScale + SCALE_STEP : SCALE_MAX;
  renderScale();
};

const onScaleDownClick = () => {
  currentScale = currentScale > SCALE_MIN ? currentScale - SCALE_STEP : SCALE_MIN;
  renderScale();
};

imgScaleUpElement.addEventListener('click', onScaleUpClick);
imgScaleDownElement.addEventListener('click', onScaleDownClick);

export {resetScale};
