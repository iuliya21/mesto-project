import { openModal } from "./modal.js";
import { pushLike, deleteLike, deleteCard, getUserCurrent } from "./api.js";
import { profile } from "./index.js"

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
  const imageLike = element.querySelector(".elements-item__like");
  const countLike = element.querySelector(".elements-item__counter-like");

  const openImage = function () {
    fullImage.alt = item.name;
    fullImage.src = item.link;
    imageOpenFullDescription.textContent = item.name;
    openModal(modalImage);
  };

  elementName.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  if (profile.id === item.owner._id) {
    btnRemove.classList.add("elements-item__button_active");
  }
  
  btnRemove.addEventListener("click", () => {
    deleteCard(item._id)
      .then(() => {
        removeCard(element);
      })
      .catch((err) => {
        console.error(err)
      })
    })

  elementPhoto.addEventListener("click", openImage);

  imageLike.addEventListener("click", function (evt) {
      if (!evt.target.classList.contains("elements-item__like_active")) {
        evt.target.classList.add("elements-item__like_active");
        pushLike(item._id)
          .then((data) => {
            countLike.textContent = data.likes.length;
            console.log(data);
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        evt.target.classList.remove("elements-item__like_active");
        deleteLike(item._id)
          .then((data) => {
            if (data.likes.length === 0) {
              countLike.textContent = "";
            } else {
              countLike.textContent = data.likes.length;
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    });

  if (item.likes.length === 0) {
    countLike.textContent = "";
  } else {
    countLike.textContent = item.likes.length;
  }

//при перезагрузке страницы мои лайки не пропадают
item.likes.forEach((obj) => {
  if (Object.values(obj).includes(profile.id)) {
    imageLike.classList.add("elements-item__like_active");
  }
})

  return element;
};