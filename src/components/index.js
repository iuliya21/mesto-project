import '../pages/index.css';
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, clearInput } from "./modal.js";
import { renderCard, createItem, removeCard, profile, Card } from "./Card.js";
import { Api, currentUser } from "./Api.js";
import { UserInfo } from "./UserInfo.js";
import { Popup, PopupWithImage, PopupWithForm } from "./Popup.js";

const buttonOpenPopupProfile = document.querySelector(".profile__button-pencil"); //кнопка редактирования имени и деятельности
const buttonOpenPopupCard = document.querySelector(".profile__button"); //кнопка добавления новой карточки
const modalEditProfile = document.querySelector(".popup_type_edit"); //первый попап
const buttonEditProfile = modalEditProfile.querySelector(".popup__button"); //кнопка сохранить профиль
const modalCreateCard = document.querySelector(".popup_type_card"); // второй попап
const placeInput = modalCreateCard.querySelector(".popup__form-text_input_place");
const linkInput = modalCreateCard.querySelector(".popup__form-text_input_link");
const formPlace = modalCreateCard.querySelector(".popup__form"); //форма для второго попапа
const editPhotoProfile = document.querySelector(".popup_type_profile-photo"); //попап редактирования фото профиля
const formEditPhoto = editPhotoProfile.querySelector(".popup__form"); //форма попапа редактирования фото профиля
const buttonEditPhoto = editPhotoProfile.querySelector(".popup__button"); //кнопка сохранить новое фото профиля
const inputEditPhotoProfile = editPhotoProfile.querySelector(".popup__form-text_input_photo-link");
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const formElement = document.querySelector(".popup__form"); //форма для первого попапа
const nameInput = formElement.querySelector(".popup__form-text_input_name"); //инпут Имя
const jobInput = formElement.querySelector(".popup__form-text_input_job"); //инпут Род деятельности
const buttonCreateCard = formPlace.querySelector(".popup__button"); //кнопка "создать"
const profilePhoto = document.querySelector(".profile__photo");
const profilePhotoEdit = document.querySelector(".profile__photo-edit");
const fullImage = document.querySelector(".popup-image__photo"); // фотография полноэкранного изображения
const imageOpenFullDescription = document.querySelector(".popup-image__description"); //подпись фото из третьего попапа

const userInfo = new UserInfo(profile, nameText, jobText, profilePhoto);
const api = new Api(currentUser);

const popupProfile = new Popup(".popup_type_edit");
const popupFullImage = new PopupWithImage(".popup_type_image", { fullImage, imageOpenFullDescription });
const popupAddCard = new Popup(".popup_type_card");
const popupAvatar = new Popup(".popup_type_profile-photo");

Promise.all([api.getUserCurrent(), api.getCards()])
  .then(([myProfile, cards]) => { //данные из моего профиля
    userInfo.setUserInfo(myProfile);

    cards.reverse().forEach((item) => { //загрузка карточек с сервера
      renderCard(createItem(item, openModal, myCardDelete, myPushLike, myDeleteLike));
    })
  })
  .catch((err) => {
    console.error(err);
  })

//функция, которая сохраняет введенные значения в форму редактирования профиля и закрывает её
function submitHandlerForm(evt) {
  evt.preventDefault();
  buttonEditProfile.textContent = 'Сохранение...';
  api.editInfoUser(nameInput.value, jobInput.value)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonEditProfile.textContent = 'Сохранить';
    })
}

//Функция установки в текстовые поля формы имени и рода деятельности первого исследователя
function setInput() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
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

//отправка запроса для удаления карточки
function myCardDelete(item, element) {
  api.deleteCard(item._id)
    .then(() => {
      removeCard(element);
    })
    .catch((err) => {
      console.error(err)
    })
}

//поставить мой лайк
function myPushLike(item, evt, countLike) {
  api.pushLike(item._id)
    .then((data) => {
      evt.target.classList.add("elements-item__like_active");
      countLike.textContent = data.likes.length;
    })
    .catch((err) => {
      console.error(err)
    })
}

//удалить мой лайк
function myDeleteLike(item, evt, countLike) {
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
}

//функция сохранения информации в новую карточку
function submitHandlerCard(evt) {
  evt.preventDefault();
  buttonCreateCard.textContent = 'Создание...';
  api.createNewCard(placeInput.value, linkInput.value)
    .then((item) => {
      renderCard(createItem(item, openModal, myCardDelete, myPushLike, myDeleteLike));
      closeModal(modalCreateCard);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonCreateCard.textContent = 'Создать';
    })
}

//функция изменения аватарки пользователя
function changeAvatar(evt) {
  evt.preventDefault();
  buttonEditPhoto.textContent = 'Сохранение...';
  const avatar = inputEditPhotoProfile.value;
  api.changePhoto(avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonEditPhoto.textContent = 'Сохранить';
    })
}

//слушатель на редактирование фото
profilePhotoEdit.addEventListener("click", () => {
  popupAvatar.open();
});

//слушатель на кнопку в форме изменения аватара
formEditPhoto.addEventListener('submit', changeAvatar);

//Слушатель на кнопку карандаша, который при клике на карандаш вызывает функцию, которая открывает окно формы для редактирования профиля
buttonOpenPopupProfile.addEventListener("click", () => {
  popupProfile.open();
  setInput();
});

//Слушатель на кнопку добавления новой карточки
buttonOpenPopupCard.addEventListener("click", () => {
  openModal(modalCreateCard);
  clearInput();
  buttonCreateCard.classList.add("popup__button_disabled");
  buttonCreateCard.setAttribute("disabled", "disabled");
});

//Отправка формы редактирования имени при событии sumbit
formElement.addEventListener("submit", submitHandlerForm);

//Отправка формы добавления карточки
formPlace.addEventListener("submit", submitHandlerCard);

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