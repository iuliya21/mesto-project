// const list = document.querySelector(".elements");

export class Card {
  constructor(item, profile, handleCardClick, {myCardDelete, myPushLike, myDeleteLike}) {
    this.item = item;
    this._id = item._id;
    this._name = item.name; // наименование картинки, приходит из массива
    this._link = item.link; // ссылка на картинку, приходит из массива
    this.handleCardClick = handleCardClick;
    this.profile = profile; // document.querySelector(".profile")
    this.myCardDelete = myCardDelete;
    this.myPushLike = myPushLike;
    this.myDeleteLike = myDeleteLike;
    this.element = document.querySelector("#template-card").content.querySelector(".elements-item").cloneNode(true);
    this.buttonRemove = this.element.querySelector(".elements-item__button");
    this.itemLike = this.element.querySelector(".elements-item__like");
    this.countLike = this.element.querySelector(".elements-item__counter-like");
  }

  generate() { // публичный метод создания карточки 
    this.element.querySelector(".elements-item__title").textContent = this._name;
    this.element.querySelector(".elements-item__photo").src = this._link;
    this.element.querySelector(".elements-item__photo").alt = this._link;

    if(this.profile.id === this.item.owner._id) { // добавляем корзину, если картинка наша
      this.buttonRemove.classList.add("elements-item__button_active");
    }

    if(this.item.likes.length === 0) {
      this.countLike.textContent = "";
    } else {
      this.countLike.textContent = this.item.likes.length;
    }

    this.item.likes.forEach((obj) => { // мои лайки при перезагрузке страницы не пропадают
      if (Object.values(obj).includes(this.profile.id)) {
        this.itemLike.classList.add("elements-item__like_active");
      }
    })

    this._setEventListeners();

    return this.element;
  }

  _setEventListeners() {
    this.element.querySelector(".elements-item__photo").addEventListener("click", () => { // вызов попапа withImage
      this.handleCardClick.open(this._name, this._link);
    })

    this.buttonRemove.addEventListener("click", (evt) => {
      this.myCardDelete(this.item, this.element);
    });

    this.itemLike.addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("elements-item__like_active")) {
        this.myPushLike(this.item, evt, this.countLike);
      } else {
        this.myDeleteLike(this.item, evt, this.countLike);
      }
    })
  }
}