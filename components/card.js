import { initialCards } from "./dates.js";
import { openModal } from "./modal.js";

const list = document.querySelector(".elements");
const cardTemplateContent = document.querySelector("#template-card").content; //контент template
const cardItem = cardTemplateContent.querySelector(".elements-item");
const modalImage = document.querySelector(".popup_type_image"); //третий попап с увеличенным изображением
const fullImage = document.querySelector(".popup-image__photo"); //фото из третьего попапа
const imageOpenFullDescription = document.querySelector(".popup-image__description"); //подпись фото из третьего попапа

//Функция удаления карточки
export const removeCard = (element) => {
  element.remove();
};

export function renderCard(element) {
  list.prepend(element);
}

//функция создания карточки
export const createItem = (item) => {
  const element = cardItem.cloneNode(true);
  const elementName = element.querySelector(".elements-item__title");
  const elementPhoto = element.querySelector(".elements-item__photo"); //фотография места
  const btnRemove = element.querySelector(".elements-item__button");

  const openImage = function () {
    fullImage.alt = item.name;
    fullImage.src = item.link;
    imageOpenFullDescription.textContent = item.name;
    openModal(modalImage);
  };

  btnRemove.addEventListener("click", () => removeCard(element));
  elementName.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  elementPhoto.addEventListener("click", openImage);

  element
    .querySelector(".elements-item__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements-item__like_active");
    });
  return element;
};

initialCards.forEach((item) => {
  renderCard(createItem(item));
});