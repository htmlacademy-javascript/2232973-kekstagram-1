import {effectSettings} from './constants.js';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsFieldset = document.querySelector('.img-upload__effects');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');

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
    imagePreview.style.filter = effectSettings[effect].filter(value);
  } else {
    imagePreview.style.filter = '';
  }
};

effectsFieldset.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effect = evt.target.value;
    const settings = effectSettings[effect];

    imagePreview.className = settings.class;
    if (settings.hidden) {
      effectLevelFieldset.classList.add('hidden');
    } else {
      effectLevelFieldset.classList.remove('hidden');
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
  imagePreview.className = '';
  effectLevelFieldset.classList.add('hidden');
  sliderElement.noUiSlider.updateOptions(effectSettings.none.sliderOptions);
};

export {resetEffects};
