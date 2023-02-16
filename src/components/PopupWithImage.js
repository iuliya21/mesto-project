import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup { // попап с увеличенным изображением
  constructor(selector) {
    super(selector);
    this.image = this._popup.querySelector(".popup-image__photo");
    this.text = this._popup.querySelector(".popup-image__description");
  }

  open(name, link) { // при открытии попапа вставляет изображение и текст
    super.open();
    this.text.alt = name;
    this.image.src = link;
    this.text.textContent = name;
  }
}