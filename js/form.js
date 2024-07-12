const fileUpload = document.querySelector('#upload-file');
const popupUpload = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

fileUpload.addEventListener('change', () => {
  popupUpload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});

const closeForm = () => {
  popupUpload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

closeButton.addEventListener('click', () => {
  closeForm();
});

// Закрытие формы редактирования изображения производится либо нажатием на кнопку #upload-cancel, либо нажатием клавиши Esc.
// Элементу .img-upload__overlay возвращается класс hidden. У элемента body удаляется класс modal-open
