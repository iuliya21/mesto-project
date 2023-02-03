import { Popup } from "./Popup";

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