export class Section {
  constructor({ cards, renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._cards = cards;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._cards.reverse().forEach((item) => {
      this._renderer(item);
    })
  }
}