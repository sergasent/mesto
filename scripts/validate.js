/*  form validation  */

const showInputError = (formElement, inputElement, validationMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(options.errorClass);
};

const validateInput = (formElement, inputElement, errorClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClasses);
  } else {
    hideInputError(formElement, inputElement, errorClasses);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if ( hasInvalidInput(inputList) ) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const refreshForm = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, options);
  });
};

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options.inactiveButtonClass);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach(formElement => setEventListeners(formElement, options));
};
