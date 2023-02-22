/*  form validation  */

const showInputError = (formElement, inputElement, validationMessage, {inputErrorClass, errorClass, ...args}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...args}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
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

const refreshForm = (formElement, {inputSelector, inputErrorClass, errorClass, inactiveButtonClass, submitButtonSelector, ...args}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
  });
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass,inputErrorClass, errorClass, ...args}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement, {inputErrorClass, errorClass});
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (validationOptions) => {
  const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));

  formList.forEach(formElement => setEventListeners(formElement, validationOptions));
};
