
import '../pages/index.css';
import { enableValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js";
import {  renderCard, createItem } from "./card.js";
import { getCards, getUserCurrent, editInfoUser, createNewCard, changePhoto } from "./api.js";

const buttonOpenPopupProfile = document.querySelector(".profile__button-pencil"); //кнопка редактирования имени и деятельности
const buttonOpenPopupCard = document.querySelector(".profile__button"); //кнопка добавления новой карточки
const modalEditProfile = document.querySelector(".popup_type_edit"); //первый попап
const buttonEditProfile = modalEditProfile.querySelector(".popup__button"); //кнопка сохранить профиль
const modalCreateCard = document.querySelector(".popup_type_card");
const placeInput = modalCreateCard.querySelector(".popup__form-text_input_place");
const linkInput = modalCreateCard.querySelector(".popup__form-text_input_link");
const formPlace = modalCreateCard.querySelector(".popup__form"); //форма для второго попапа
export const profile = document.querySelector(".profile"); //профиль пользователя
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

Promise.all([getUserCurrent(), getCards()])
.then(([myProfile, cards]) => {//данные из моего профиля
  profile.id = myProfile._id;
  nameText.textContent = myProfile.name;
  jobText.textContent = myProfile.about;
  profilePhoto.src = myProfile.avatar;

  cards.reverse().forEach((item) => {//загрузка карточек с сервера
    renderCard(createItem(item));
  })
})
.catch((err) => {
  console.error(err);
})

profilePhoto.addEventListener("mouseover", () => {
  profilePhotoEdit.style.visibility = "visible";
});

profilePhotoEdit.addEventListener("mouseout", () => {
  profilePhotoEdit.style.visibility = "hidden";
});

profilePhotoEdit.addEventListener("mouseover", () => {
  profilePhotoEdit.style.visibility = "visible";
});

//функция сохранения информации в новую карточку
function submitHandlerCard(evt) {
  evt.preventDefault();
  buttonCreateCard.textContent = 'Создание...';
  createNewCard(placeInput.value, linkInput.value)
    .then((item) => {
      renderCard(createItem(item));
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonCreateCard.textContent = 'Создать';
    })
  closeModal(modalCreateCard);
}

//Функция установки в текстовые поля формы имени и рода деятельности первого исследователя
function setInput() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

//функция очистки модального окна: название места и ссылка
const clearInput = () => {
  formPlace.reset();
};

//функция, которая сохраняет введенные значения в форму редактирования профиля и закрывает её
function submitHandlerForm(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  buttonEditProfile.textContent = 'Сохранение...'
  editInfoUser(nameInput.value, jobInput.value)
    .finally(() => {
      buttonEditProfile.textContent = 'Сохранить';
      closeModal(modalEditProfile);
    })
}

//функция изменения аватарки пользователя
function changeAvatar(evt) {
  evt.preventDefault();
  buttonEditPhoto.textContent = 'Сохранение...';
  const avatar = inputEditPhotoProfile.value;
  changePhoto(avatar)
    .then((item) => {
      profilePhoto.src = item.avatar;
      profilePhoto.alt = item.avatar;
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      buttonEditPhoto.textContent = 'Сохранить';
    })
    closeModal(editPhotoProfile);
}

//слушатель на кнопку в форме изменения аватара
formEditPhoto.addEventListener('submit', changeAvatar);

//слушатель на редактирование фото
profilePhotoEdit.addEventListener("click", () => {
  openModal(editPhotoProfile);
});

//Слушатель на кнопку карандаша, который при клике на карандаш вызывает функцию, которая открывает окно формы
buttonOpenPopupProfile.addEventListener("click", () => {
  openModal(modalEditProfile);
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-text",
  inputErrorClass: "popup__form-text_type_error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
});