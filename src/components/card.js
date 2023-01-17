export const profile = document.querySelector(".profile"); //профиль пользователя
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

export const createItem = (item, openModal, myCardDelete, myPushLike, myDeleteLike) => {
  const element = cardItem.cloneNode(true);
  const elementName = element.querySelector(".elements-item__title");
  const elementPhoto = element.querySelector(".elements-item__photo"); //фотография места
  const btnRemove = element.querySelector(".elements-item__button");
  const imageLike = element.querySelector(".elements-item__like");
  const countLike = element.querySelector(".elements-item__counter-like");

  const openImage = function () { //функция, которая по клику увеличивает фото карточки
    fullImage.alt = item.name;
    fullImage.src = item.link;
    imageOpenFullDescription.textContent = item.name;
    openModal(modalImage);
  };

  elementPhoto.addEventListener("click", openImage);

  elementName.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  if (profile.id === item.owner._id) {
    btnRemove.classList.add("elements-item__button_active");
  }
  
  btnRemove.addEventListener("click", () => {
    myCardDelete(item, element);
    })

  imageLike.addEventListener("click", function (evt) {
      if (!evt.target.classList.contains("elements-item__like_active")) {
        myPushLike(item, evt, countLike);
      } else {
        myDeleteLike(item, evt, countLike);
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