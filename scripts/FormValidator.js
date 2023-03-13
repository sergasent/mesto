/*  form validation  */

export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError(inputElement, validationMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _validateInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    const isFormValid = !this._hasInvalidInput();
    this._buttonElement.disabled = !isFormValid;

    this._buttonElement.classList.toggle(this._config.inactiveButtonClass, !isFormValid);
  }

  _refreshForm() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => this._hideInputError(inputElement) );
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement);
        this._toggleButtonState();
      });
    });

    this._form.addEventListener('reset', () => setTimeout(() => this._refreshForm(), 0) );
  }

  enableValidation() {
    this._setEventListeners();
  }
}
