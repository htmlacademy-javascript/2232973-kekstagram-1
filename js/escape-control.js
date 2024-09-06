import { isEscapeKey } from './util.js';

const controls = [];
let listener = null;

const removeEscapeControl = () => {
  controls.length -= 1;
  if (!controls.length) {
    document.removeEventListener('keydown', onDocumentEscape);
    listener = null;
  }
};

const setEscapeControl = (cb, condition = null) => {
  if (!listener) {
    listener = document.addEventListener('keydown', onDocumentEscape);
  }
  controls.push({cb, condition});
};

function onDocumentEscape(evt) {
  if (isEscapeKey(evt)) {
    const index = controls.length - 1;
    if(controls[index].condition && !controls[index].condition()){
      return;
    }
    controls[index].cb();
    removeEscapeControl();
  }
}

export {setEscapeControl, removeEscapeControl};
