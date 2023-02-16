import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit}) {
    super(selector);
    this._inputs = document.querySelector(this.selector).querySelectorAll('.popup__form-text');
    this.handleFormSubmit = handleFormSubmit;
  }

  getInputValues() { // приватный метод, собирает данные всех полей формы
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() { // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
    super.setEventListeners();
    this._form.addEventListener("submit", this.handleFormSubmit);
  }

  close() { // при закрытии попапа форма должна сбрасываться
    super.close();
    this._form.reset();
  }
}