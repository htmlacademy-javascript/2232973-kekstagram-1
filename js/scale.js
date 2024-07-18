const imgScaleUp = document.querySelector('.scale__control--bigger');
const imgScaleDown = document.querySelector('.scale__control--smaller');
const imgScaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const resetScale = () => {
  imgScaleValue.value = '100%';
  imgPreview.style.transform = 'scale(1)';
  imgPreview.style.filter = 'none';
};

const scaleUp = () => {
  const scaleValue = parseInt(imgScaleValue.value, 10);
  if (scaleValue >= 100) {
    return;
  }
  imgScaleValue.value = (`${scaleValue + 25}%`).toString();
  imgPreview.style.transform = `scale(${(scaleValue + 25) / 100})`;
};

const scaleDown = () => {
  const scaleValue = parseInt(imgScaleValue.value, 10);
  if (scaleValue <= 25) {
    return;
  }
  imgScaleValue.value = (`${scaleValue - 25}%`).toString();
  imgPreview.style.transform = `scale(${(scaleValue - 25) / 100})`;
};

imgScaleUp.addEventListener('click', scaleUp);
imgScaleDown.addEventListener('click', scaleDown);

export {resetScale};
