import { isEscapeKey } from './util.js';

let currentMessageElement = null;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const onOutsideClick = (evt) => {
  if (
    currentMessageElement &&
    !currentMessageElement.querySelector('.success__inner, .error__inner').contains(evt.target)
  ) {
    removeMessage();
  }
};

const showMessage = (template) => {
  currentMessageElement = template.cloneNode(true);
  document.body.append(currentMessageElement);

  const closeButton = currentMessageElement.querySelector('.success__button, .error__button');
  closeButton.addEventListener('click', removeMessage);

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

function removeMessage() {
  currentMessageElement.remove();
  currentMessageElement = null;
  const closeButton = currentMessageElement.querySelector('.success__button, .error__button');
  closeButton.removeEventListener('click', removeMessage);
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOutsideClick);
}

export { showMessage };
