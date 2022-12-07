const modalActiveClass = "popup_opened";

const buttonOpenPopupProfile = document.querySelector(".profile__button-pencil"); //кнопка редактирования имени и деятельности
const buttonOpenPopupCard = document.querySelector(".profile__button"); //кнопка добавления новой карточки
const modals = document.querySelectorAll(".popup"); //создаем коллекцию всех попапов
const modalEditProfile = document.querySelector(".popup_type_edit"); //первый попап
const modalCreateCard = document.querySelector(".popup_type_card"); //второй попап
const modalImage = document.querySelector(".popup_type_image"); //третий попап с увеличенным изображением
const fullImage = document.querySelector(".popup-image__photo"); //фото из третьего попапа
const imageOpenFullDescription = document.querySelector(".popup-image__description"); //подпись фото из третьего попапа
const nameText = document.querySelector(".profile__title");
const jobText = document.querySelector(".profile__paragraph");
const formElement = document.querySelector(".popup__form"); //форма для первого попапа
const nameInput = formElement.querySelector(".popup__form-text_input_name"); //инпут Имя
const jobInput = formElement.querySelector(".popup__form-text_input_job"); //инпут Род деятельности
const formPlace = modalCreateCard.querySelector(".popup__form"); //форма для второго попапа
const buttonCreateCard = formPlace.querySelector(".popup__button") //кнопка "создать"
const placeInput = modalCreateCard.querySelector(".popup__form-text_input_place");
const linkInput = modalCreateCard.querySelector(".popup__form-text_input_link");
const place = document.querySelector(".places");
const list = document.querySelector(".elements");
const cardTemplateContent = document.querySelector("#template-card").content; //контент template
const cardItem = cardTemplateContent.querySelector(".elements-item");

//Функция открытия окна
const openModal = function (popup) {
  popup.classList.add(modalActiveClass);
  document.addEventListener("keydown", closeByEsc);
};
//Функция закрытия окна
const closeModal = function (popup) {
  popup.classList.remove(modalActiveClass);
  document.removeEventListener("keydown", closeByEsc);
};
//функция очистки модального окна: название места и ссылка
const clearInput = () => {
  formPlace.reset();
};
//Функция удаления карточки
const removeCard = (element) => {
  element.remove();
};
//Функция создания карточки
const createItem = (item) => {
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

function renderCard(element) {
  list.prepend(element);
}

initialCards.forEach((item) => {
  renderCard(createItem(item));
});

//Функция установки в текстовые поля формы имени и рода деятельности первого исследователя
function setInput() {
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

//Функция, которая сохраняет введенные значения в форму и закрывает её
function submitHandlerForm(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closeModal(modalEditProfile);
}

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

// функция закрытия по esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModal(openedPopup);
  }
};

// функция закрытия попап по клику по оверлею и крестикам
modals.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button-close")) {
      closeModal(popup)
    }
  });
});

//Отправка формы редактирования имени при событии sumbit
formElement.addEventListener("submit", submitHandlerForm);

//Отправка формы добавления карточки
formPlace.addEventListener("submit", submitHandlerCard);
