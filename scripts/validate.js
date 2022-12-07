// показать текст ошибки
const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// спрятать текст ошибки
const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
}

const disableButton = (formSubmitButtonElement, inactiveButtonClass) => {
  formSubmitButtonElement.classList.add(inactiveButtonClass);
  formSubmitButtonElement.disabled = true;
}

const enableButton = (formSubmitButtonElement, inactiveButtonClass) => {
  formSubmitButtonElement.classList.remove(inactiveButtonClass);
  formSubmitButtonElement.disabled = false;
}

// переключатель состояние кнопки активная / неактивная
const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
  if(buttonState) {
    disableButton(formSubmitButtonElement, inactiveButtonClass);
  } else {
    enableButton(formSubmitButtonElement, inactiveButtonClass);
  }
}

const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if(inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, inputErrorClass);
  } else {
    showInputError(inputElement, errorElement, inputErrorClass);
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
}

const handleFormInput = (evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs) => {
  const inputElement = evt.target;
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
  checkInputValidity(inputElement, errorElement, inputErrorClass);
  const buttonState = hasInvalidInput(inputs);
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState);
};

const enableValidation = (config) => {
  const formSelector = config.formSelector;
  const inputSelector = config.inputSelector;
  const inputErrorClass = config.inputErrorClass;
  const submitButtonSelector = config.submitButtonSelector;
  const inactiveButtonClass = config.inactiveButtonClass;
  const forms = Array.from(document.querySelectorAll(formSelector)) //массив всех форм
  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(inputSelector)); //все инпуты в форме
    const formSubmitButtonElement = form.querySelector(submitButtonSelector);
    inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => handleFormInput(evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs));
  });
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-text',
  inputErrorClass: 'popup__form-text_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
});
