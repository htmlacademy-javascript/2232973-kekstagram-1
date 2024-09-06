import {effectSettings} from './constants.js';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsFieldsetElement = document.querySelector('.img-upload__effects');
const effectLevelFieldsetElement = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const updateFilter = (value) => {
  const effect = document.querySelector('.effects__radio:checked').value;
  if (effectSettings[effect].filter) {
    imagePreviewElement.style.filter = effectSettings[effect].filter(value);
  } else {
    imagePreviewElement.style.filter = '';
  }
};

effectsFieldsetElement.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effect = evt.target.value;
    const settings = effectSettings[effect];

    imagePreviewElement.className = settings.class;
    if (settings.hidden) {
      effectLevelFieldsetElement.classList.add('hidden');
    } else {
      effectLevelFieldsetElement.classList.remove('hidden');
    }

    sliderElement.noUiSlider.updateOptions(settings.sliderOptions);
    sliderValueElement.value = settings.sliderOptions.start;
    updateFilter(settings.sliderOptions.start);
  }
});

sliderElement.noUiSlider.on('update', (value) => {
  sliderValueElement.value = value;
  updateFilter(value);
});

const resetEffects = () => {
  imagePreviewElement.className = '';
  effectLevelFieldsetElement.classList.add('hidden');
  sliderElement.noUiSlider.updateOptions(effectSettings.none.sliderOptions);
};

export {resetEffects};
