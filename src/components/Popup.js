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

