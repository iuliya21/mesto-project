const modalActiveClass = "popup_opened";
const modals = document.querySelectorAll(".popup");
const modalCreateCard = document.querySelector(".popup_type_card");
const formPlace = modalCreateCard.querySelector(".popup__form");

//Функция открытия окна
export const openModal = function (popup) {
  popup.classList.add(modalActiveClass);
  document.addEventListener("keydown", closeByEsc);
};

//Функция закрытия окна
export const closeModal = function (popup) {
  popup.classList.remove(modalActiveClass);
  document.removeEventListener("keydown", closeByEsc);
};

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

//функция очистки модального окна: название места и ссылка
export const clearInput = () => {
  formPlace.reset();
};
