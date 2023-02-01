export class Popup {
  constructor(selector) {
    this.selector = selector;
  }

  open() {
    document.querySelector(this.selector).classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    document.querySelector(this.selector).classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
  }}

  setEventListeners() {
    document.querySelector(this.selector).addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button-close")) {
        this.close();
      }
    })
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}

export class PopupWithImage extends Popup { // попап с увеличенным изображением
  constructor(selector, { name, link }) {
    super(selector);
    this._name = name;
    this._link = link;
  }

  open() { // при открытии попапа вставляет изображение и текст
    super.open();
    document.querySelector(".popup-image__photo").alt = this._name;
    document.querySelector(".popup-image__photo").src = this._link;
    document.querySelector(".popup-image__description").textContent = this._name;
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = document.querySelector(this.selector).querySelector('.popup__form');
    this._inputs = document.querySelector(this.selector).querySelectorAll('.popup__form-text');
  }

  _getInputValues() { // приватный метод, собирает данные всех полей формы
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setEventListeners() { // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
    super.setEventListeners();
    document.querySelector(this.selector).addEventListener("submit", (evt) => {
      this._callback(evt, this._getInputValues());
    })
  }

  close() { // при закрытии попапа форма должна сбрасываться
    super.close();
    this._form.reset();
  }
}