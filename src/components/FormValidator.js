export class FormValidator {

  constructor(config, form) {
    this.inputSelector = config.inputSelector;
    this.inputErrorClass = config.inputErrorClass;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.form = form;
  }

  _showInputError(inputElement, errorElement, inputErrorClass) { // приватный метод - показать текст ошибки
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement, inputErrorClass) { // приватный метод - скрыть текст ошибки
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
  }

  _disableButton(formSubmitButtonElement, inactiveButtonClass) { // приватный метод - деактивировать кнопку
    formSubmitButtonElement.classList.add(inactiveButtonClass);
    formSubmitButtonElement.disabled = true;
  }

  _enableButton(formSubmitButtonElement, inactiveButtonClass) { // приватный метод - активировать кнопку
    formSubmitButtonElement.classList.remove(inactiveButtonClass);
    formSubmitButtonElement.disabled = false;
  }

  _toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState) { // приватный метод - переключатель кнопки
    if(buttonState) {
      this._disableButton(formSubmitButtonElement, inactiveButtonClass);
    } else {
      this._enableButton(formSubmitButtonElement, inactiveButtonClass);
    }
  }

  _checkInputValidity(inputElement, errorElement, inputErrorClass) { // приватный метод - проверки валидации
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if(inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement, inputErrorClass);
    } else {
      this._showInputError(inputElement, errorElement, inputErrorClass);
    }
  }

  _hasInvalidInput(inputs) {  // инпуты, не прошедшие валидацию
    return inputs.some((input) => !input.validity.valid);
  }

  _handleFormInput(evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs) {
    const inputElement = evt.target;
    const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
    this._checkInputValidity(inputElement, errorElement, inputErrorClass);
    const buttonState = this._hasInvalidInput(inputs);
    this._toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState);
  }

  enableValidation() { // публичный метод валидации
    const inputs = Array.from(this.form.querySelectorAll(this.inputSelector)); // все инпуты в форме
    const formSubmitButtonElement = this.form.querySelector(this.submitButtonSelector);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._handleFormInput(evt, this.form, this.inputErrorClass, formSubmitButtonElement, this.inactiveButtonClass, inputs);
      });
    });
  }
}