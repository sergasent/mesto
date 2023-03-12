/*  form validation  */

export class FormValidator {
  constructor(configs, form) {
    this._configs = configs;
    this._form = form;
  }

  _showInputError(inputElement, validationMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._configs.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._configs.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._configs.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._configs.errorClass);
  }

  _validateInput(inputElement, errorClasses) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    // if ( this._hasInvalidInput(inputList) ) {
    //   buttonElement.classList.add(this._configs.inactiveButtonClass);
    // } else {
    //   buttonElement.classList.remove(this._configs.inactiveButtonClass);
    // }

    const isFormValid = !this._hasInvalidInput(inputList);
    buttonElement.disabled = !isFormValid;

    if (!isFormValid) {
      buttonElement.classList.add(this._configs.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._configs.inactiveButtonClass);
    }
  }

  _refreshForm() {
    const inputList = Array.from(this._form.querySelectorAll(this._configs.inputSelector));
    const buttonElement = this._form.querySelector(this._configs.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._configs.inputSelector));
    const buttonElement = this._form.querySelector(this._configs.submitButtonSelector);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    this._form.addEventListener('reset', () => setTimeout(() => this._refreshForm(), 0) );
  }

  enableValidation() {
    this._setEventListeners();
  }

}
