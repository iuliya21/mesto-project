import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { settings } from "../utils/utils.js";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { currentUser } from "../utils/utils.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";

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

// запуск валидации
const profileValidate = new FormValidator(settings, formElement);
profileValidate.enableValidation();
const addCardValidate = new FormValidator(settings, formPlace);
addCardValidate.enableValidation();
const profilePhotoValidate = new FormValidator(settings, formEditPhoto);
profilePhotoValidate.enableValidation();

  Promise.all([api.getUserCurrent(), api.getCards()])
    .then(([myProfile, cards]) => {
      userInfo.setUserInfo(myProfile);
      section = new Section({
        renderer: (item) => {
          cardElement = createCard(item);
          section.addItem(cardElement);
        }
      }, '.elements');
      section.renderItems(cards);
    })
    .catch((err) => {
      console.error(err);
    })

const popupFullImage = new PopupWithImage(".popup_type_image");
popupFullImage.setEventListeners();

const renderLoading = (button ,bolean) => {
  if(bolean) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

const popupEditProfile = new PopupWithForm(".popup_type_edit", 
  {handleFormSubmit: (evt) =>
    {evt.preventDefault();
    renderLoading(buttonEditProfile, true);
    api.editInfoUser(popupEditProfile.getInputValues())
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        renderLoading(buttonEditProfile, false);
      })}
});
popupEditProfile.setEventListeners();

const popupEditPhoto = new PopupWithForm(".popup_type_profile-photo", 
  {handleFormSubmit: (evt) =>
    {evt.preventDefault();
    renderLoading(buttonEditPhoto, true);
    api.changePhoto(popupEditPhoto.getInputValues())
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditPhoto.close();
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        renderLoading(buttonEditPhoto, false);
      })}
});
popupEditPhoto.setEventListeners();

const popupNewCard = new PopupWithForm(".popup_type_card",  
  {handleFormSubmit: (evt) => {
  evt.preventDefault();
  renderLoading(buttonCreateCard, true);
  api.createNewCard(popupNewCard.getInputValues())
    .then((item) => {
      formPlace.reset();
      cardElement = createCard(item);
      section.addItem(cardElement);
      popupNewCard.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      renderLoading(buttonCreateCard, false);
    })
  }}
);
popupNewCard.setEventListeners();

const createCard = (item) => {
  const createCardItem = new Card(item, profile, popupFullImage, 
    {myCardDelete: (item) => {
      api.deleteCard(item._id)
    .then(() => {
      createCardItem.removeCard();
    })
    .catch((err) => {
      console.error(err);
    })
    },
    myPushLike: (item) => {
      api.pushLike(item._id)
        .then((data) => {
          createCardItem.pushMyLike(data);
        })
        .catch((err) => {
          console.error(err)
        })},
    myDeleteLike: (item) => {
      api.deleteLike(item._id)
        .then((data) => {
          createCardItem.deleteMyLike(data);
        })
        .catch((err) => {
          console.error(err)
        })
    }});
    console.log();
    return createCardItem.generate();
}

//слушатель на редактирование фото
profilePhotoEdit.addEventListener("click", () => {
  profilePhotoValidate.toggleButtonState();
  profilePhotoValidate.resetError();
  popupEditPhoto.open();
})

// слушатель на кнопку карандаша, который при клике на карандаш вызывает функцию, которая открывает окно формы для редактирования профиля
buttonOpenPopupProfile.addEventListener("click", () => {
  popupEditProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});

// cлушатель на кнопку добавления новой карточки
buttonOpenPopupCard.addEventListener("click", () => {
  addCardValidate.toggleButtonState();
  addCardValidate.resetError();
  popupNewCard.open();
})