const list = document.querySelector(".elements");

//Функция удаления карточки
export const removeCard = (element) => {
  element.remove();
};

export function renderCard(element) {
  list.prepend(element);
}