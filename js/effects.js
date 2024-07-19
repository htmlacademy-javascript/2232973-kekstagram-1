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

const effectSettings = {
  'none': {
    class: '',
    filter: '',
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: true,
  },
  'chrome': {
    class: 'effects__preview--chrome',
    filter: (value) => `grayscale(${value / 100})`,
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: false,
  },
  'sepia': {
    class: 'effects__preview--sepia',
    filter: (value) => `sepia(${value / 100})`,
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: false,
  },
  'marvin': {
    class: 'effects__preview--marvin',
    filter: (value) => `invert(${value}%)`,
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: false,
  },
  'phobos': {
    class: 'effects__preview--phobos',
    filter: (value) => `blur(${(value * 3) / 100}px)`,
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: false,
  },
  'heat': {
    class: 'effects__preview--heat',
    filter: (value) => `brightness(${1 + (value * 2) / 100})`,
    sliderOptions: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    },
    hidden: false,
  },
};

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
    sliderElement.noUiSlider.set(settings.sliderOptions.start);
    sliderValueElement.value = settings.sliderOptions.start;
    updateFilter(settings.sliderOptions.start);
  }
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  sliderValueElement.value = value;
  updateFilter(value);
});

const resetEffects = () => {
  imagePreview.className = '';
  effectLevelFieldset.classList.add('hidden');
  sliderElement.noUiSlider.updateOptions(effectSettings.none.sliderOptions);
  sliderElement.noUiSlider.set(effectSettings.none.sliderOptions.start);
  sliderValueElement.value = effectSettings.none.sliderOptions.start;
};

export {resetEffects};
