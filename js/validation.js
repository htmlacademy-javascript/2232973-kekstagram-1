import { COMMENT_MAX_LENGTH, hashtagValidations } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const tagsField = document.querySelector('.text__hashtags');
const photoComment = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper'
});

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  photoComment,
  validateComment,
  `Не более ${COMMENT_MAX_LENGTH} символов`
);

Object.keys(hashtagValidations).forEach((key) => {
  pristine.addValidator(
    tagsField,
    (value) => {
      const hashtags = value.trim().toLowerCase().split(/\s+/).filter((tag) => tag !== '');
      if (key === 'uniqueTags' || key === 'maxTags') {
        return hashtagValidations[key].test(hashtags);
      }
      return hashtags.every((tag) => hashtagValidations[key].test(tag));
    },
    hashtagValidations[key].errorMessage
  );
});

const resetValidation = () => pristine.reset();
const isValid = () => pristine.validate();

export { resetValidation, isValid };
