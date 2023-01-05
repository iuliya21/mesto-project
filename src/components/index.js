
import '../pages/index.css';
import { enableValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js";
import {  renderCard, createItem } from "./card.js";

const buttonOpenPopupProfile = document.querySelector(".profile__button-pencil"); //кнопка редактирования имени и деятельности
const buttonOpenPopupCard = document.querySelector(".profile__button"); //кнопка добавления новой карточки
const modalEditProfile = document.querySelector(".popup_type_edit"); //первый попап
const modalCreateCard = document.querySelector(".popup_type_card");
const placeInput = modalCreateCard.querySelector(".popup__form-text_input_place");
const linkInput = modalCreateCard.querySelector(".popup__form-text_input_link");
const formPlace = modalCreateCard.querySelector(".popup__form"); //форма для второго попапа
const editPhotoProfile = document.querySelector(".popup_type_profile-photo");
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const formElement = document.querySelector(".popup__form"); //форма для первого попапа
const nameInput = formElement.querySelector(".popup__form-text_input_name"); //инпут Имя
const jobInput = formElement.querySelector(".popup__form-text_input_job"); //инпут Род деятельности
const buttonCreateCard = formPlace.querySelector(".popup__button"); //кнопка "создать"
const profilePhoto = document.querySelector(".profile__photo");
const profilePhotoEdit = document.querySelector(".profile__photo-edit");

profilePhoto.addEventListener("mouseover", () => {
  profilePhotoEdit.style.visibility = "visible";
});

profilePhotoEdit.addEventListener("mouseout", () => {
  profilePhotoEdit.style.visibility = "hidden";
});

profilePhotoEdit.addEventListener("mouseover", () => {
  profilePhotoEdit.style.visibility = "visible";
});

//Функция сохранения информации в новую карточку
function submitHandlerCard(evt) {
  evt.preventDefault();
  const newPlace = placeInput.value;
  const newLink = linkInput.value;
  renderCard(
    createItem({
      name: newPlace,
      link: newLink,
    })
  );
  closeModal(modalCreateCard);
}

//Функция установки в текстовые поля формы имени и рода деятельности первого исследователя
function setInput() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

//функция очистки модального окна: название места и ссылка
export const clearInput = () => {
  formPlace.reset();
};

//Функция, которая сохраняет введенные значения в форму и закрывает её
function submitHandlerForm(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closeModal(modalEditProfile);
}

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

//авторизация на сервере
const currentUser = {
  currentUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '5316090b-29fc-4b6a-8b2f-268d3472034e',
    'Content-Type': 'application/json'
  }
};

//проверка запроса
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

//данные о текущем пользователе
const getUserCurrent = () => {
  return fetch(`${currentUser.currentUrl}/users/me`, {
  headers: {
    authorization: '5316090b-29fc-4b6a-8b2f-268d3472034e',
    'Content-Type': 'application/json'
  }
})
  .then(res => checkResponse(res))
  .then(res => console.log(res))
}

getUserCurrent();




