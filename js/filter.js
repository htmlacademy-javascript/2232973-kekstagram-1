import { debounce } from './util.js';
import { renderGallery } from './gallery.js';
import { RANDOM_PHOTOS_COUNT, RANDOM_FACTOR, Filters } from './constants.js';

const imgFiltersFormElement = document.querySelector('.img-filters__form');

const pictures = [];

const filteredData = {
  [Filters.DEFAULT]: () => pictures,
  [Filters.RANDOM]: () => pictures
    .slice()
    .sort(() => RANDOM_FACTOR - Math.random())
    .slice(0, RANDOM_PHOTOS_COUNT),
  [Filters.DISCUSSED]: () => pictures
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length),
};

const onFilterChange = ({target}) => {
  if (target.classList.contains('img-filters__button')) {
    renderGallery(filteredData[target.id]());
  }
};

const setActiveButton = (button) => {
  document
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

imgFiltersFormElement.addEventListener('click', debounce(onFilterChange));
imgFiltersFormElement.addEventListener('click', ({target}) => {
  if (target.classList.contains('img-filters__button')) {
    setActiveButton(target);
  }
});

const init = (data) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  pictures.push(...data);
};

export { init };


