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
  constructor(selector) {
    super(selector);
    this.image = document.querySelector(".popup-image__photo");
    this.text = document.querySelector(".popup-image__description");;
  }

  open(name, link) { // при открытии попапа вставляет изображение и текст
    super.open();
    this.text.alt = name;
    this.image.src = link;
    this.text.textContent = name;
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit}) {
    super(selector);
    this._form = document.querySelector(this.selector).querySelector('.popup__form');
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
    document.querySelector(this.selector).addEventListener("submit", this.handleFormSubmit);
  }

  close() { // при закрытии попапа форма должна сбрасываться
    super.close();
    this._form.reset();
  }
}

// setEventListeners() { // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
//   super.setEventListeners();
//   document.querySelector(this.selector).addEventListener("submit", (evt) => {
//     this._callback(evt, this._getInputValues());
//   })
// }

// const popupNewCard = new PopupWithForm(".popup_type_card", (evt, getInputs) => {
//   evt.preventDefault();
//   buttonCreateCard.textContent = 'Создание...';
//   api.createNewCard(getInputs.place, getInputs.link)
//     .then((item) => {
//       formPlace.reset();
//       cardElement = createCard(item);
//       section.addItem(cardElement);
//       popupNewCard.close();
//     })
//     .catch((err) => {
//       console.error(err)
//     })
//     .finally(() => {
//       buttonCreateCard.textContent = 'Создать';
//     })
// });