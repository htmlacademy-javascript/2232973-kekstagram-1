import { COMMENT_MAX_LENGTH, hashtagValidations } from './constants.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const tagsFieldElement = document.querySelector('.text__hashtags');
const photoCommentElement = document.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper'
});

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  photoCommentElement,
  validateComment,
  `Не более ${COMMENT_MAX_LENGTH} символов`
);

Object.keys(hashtagValidations).forEach((key, index, arr) => {
  pristine.addValidator(
    tagsFieldElement,
    (value) => {
      const hashtags = value.trim().toLowerCase().split(/\s+/).filter((tag) => tag !== '');
      if (key === 'uniqueTags' || key === 'maxTags') {
        return hashtagValidations[key].test(hashtags);
      }
      return hashtags.every((tag) => hashtagValidations[key].test(tag));
    },
    hashtagValidations[key].errorMessage,
    arr.length - index,
    true
  );
});

const resetValidation = () => pristine.reset();
const isValid = () => pristine.validate();

export { resetValidation, isValid };
