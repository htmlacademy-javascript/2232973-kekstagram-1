import { showMessage } from './fetch-result.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.error');

const fetchData = () =>
  fetch('https://28.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(() => {
      showMessage(dataErrorTemplate);
    });

export { fetchData };
