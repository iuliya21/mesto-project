import '../pages/index.css';
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Api, currentUser } from "./Api.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithImage, PopupWithForm } from "./Popup.js";
import { Section } from "./Section.js";

const profile = document.querySelector(".profile"); //профиль пользователя
const buttonOpenPopupProfile = document.querySelector(".profile__button-pencil"); //кнопка редактирования имени и деятельности
const buttonOpenPopupCard = document.querySelector(".profile__button"); //кнопка добавления новой карточки
const modalEditProfile = document.querySelector(".popup_type_edit"); //первый попап
const buttonEditProfile = modalEditProfile.querySelector(".popup__button"); //кнопка сохранить профиль
const modalCreateCard = document.querySelector(".popup_type_card"); // второй попап
const formPlace = modalCreateCard.querySelector(".popup__form"); //форма для второго попапа
const editPhotoProfile = document.querySelector(".popup_type_profile-photo"); //попап редактирования фото профиля
const formEditPhoto = editPhotoProfile.querySelector(".popup__form"); //форма попапа редактирования фото профиля
const buttonEditPhoto = editPhotoProfile.querySelector(".popup__button"); //кнопка сохранить новое фото профиля
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const formElement = document.querySelector(".popup__form"); //форма для первого попапа
const nameInput = formElement.querySelector(".popup__form-text_input_name"); //инпут Имя
const jobInput = formElement.querySelector(".popup__form-text_input_job"); //инпут Род деятельности
const buttonCreateCard = formPlace.querySelector(".popup__button"); //кнопка "создать"
const profilePhoto = document.querySelector(".profile__photo");
const profilePhotoEdit = document.querySelector(".profile__photo-edit");
let section;
let cardElement;

const userInfo = new UserInfo(profile, nameText, jobText, profilePhoto);
const api = new Api(currentUser);

  Promise.all([api.getUserCurrent(), api.getCards()])
    .then(([myProfile, cards]) => {
      userInfo.setUserInfo(myProfile);
      section = new Section({
        cards: cards,
        renderer: (item) => {
          cardElement = createCard(item);
          section.addItem(cardElement);
        }
      }, '.elements');
      section.renderItems();
    })
    .catch((err) => {
      console.error(err);
    })


const popupFullImage = new PopupWithImage(".popup_type_image");

const popupEditProfile = new PopupWithForm(".popup_type_edit", (evt, getInputs) => {
  evt.preventDefault();
  buttonEditProfile.textContent = 'Сохранение...';
  api.editInfoUser(getInputs.name, getInputs.job)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonEditProfile.textContent = 'Сохранить';
    })
});
popupEditProfile.setEventListeners();

const popupEditPhoto = new PopupWithForm(".popup_type_profile-photo", (evt, getInputs) => {
  evt.preventDefault();
  buttonEditPhoto.textContent = 'Сохранение...';
  api.changePhoto(getInputs.photo)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditPhoto.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonEditPhoto.textContent = 'Сохранить';
    });
});
popupEditPhoto.setEventListeners();

const popupNewCard = new PopupWithForm(".popup_type_card", (evt, getInputs) => {
  evt.preventDefault();
  buttonCreateCard.textContent = 'Создание...';
  api.createNewCard(getInputs.place, getInputs.link)
    .then((item) => {
      cardElement = createCard(item);
      section.addItem(cardElement);
      popupNewCard.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonCreateCard.textContent = 'Создать';
    })
});

const createCard = (item) => {
  const createCardItem = new Card(item, profile, popupFullImage, 
    {myCardDelete: (item, element) => {
      api.deleteCard(item._id)
    .then(() => {
      element.remove();
    })
    .catch((err) => {
      console.error(err);
    })
    },
    myPushLike: (item, evt, countLike) => {
      api.pushLike(item._id)
        .then((data) => {
          evt.target.classList.add("elements-item__like_active");
          countLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err)
        })},
    myDeleteLike: (item, evt, countLike) => {
      api.deleteLike(item._id)
        .then((data) => {
          evt.target.classList.remove("elements-item__like_active");
          if (data.likes.length === 0) {
            countLike.textContent = "";
          } else {
            countLike.textContent = data.likes.length;
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }});
    
    return createCardItem.generate();
}

profilePhoto.addEventListener("mouseover", () => {
  profilePhotoEdit.style.visibility = "visible";
});

profilePhotoEdit.addEventListener("mouseout", () => {
  profilePhotoEdit.style.visibility = "hidden";
});

profilePhotoEdit.addEventListener("mouseover", () => {
  profilePhotoEdit.style.visibility = "visible";
});

//слушатель на редактирование фото
profilePhotoEdit.addEventListener("click", () => {
  popupEditPhoto.open();
});

//Слушатель на кнопку карандаша, который при клике на карандаш вызывает функцию, которая открывает окно формы для редактирования профиля
buttonOpenPopupProfile.addEventListener("click", () => {
  popupEditProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});

// cлушатель на кнопку добавления новой карточки
buttonOpenPopupCard.addEventListener("click", () => {
  popupNewCard.open();
  buttonCreateCard.classList.add("popup__button_disabled");
  buttonCreateCard.setAttribute("disabled", "disabled");
});

const settings = {
  inputSelector: ".popup__form-text",
  inputErrorClass: "popup__form-text_type_error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
}

// запуск валидации
const profileValidate = new FormValidator(settings, formElement);
profileValidate.enableValidation();
const addCardValidate = new FormValidator(settings, formPlace);
addCardValidate.enableValidation();
const profilePhotoValidate = new FormValidator(settings, formEditPhoto);
profilePhotoValidate.enableValidation();