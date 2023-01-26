//авторизация на сервере
const currentUser = {
  currentUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '5316090b-29fc-4b6a-8b2f-268d3472034e',
    'Content-Type': 'application/json'
  }
};

//проверка статуса запроса
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

//данные о текущем пользователе
export const getUserCurrent = () => {
  return fetch(`${currentUser.currentUrl}/users/me`, {
  headers: currentUser.headers
})
  .then(res => checkResponse(res))
}

//массив карточек с сервера
export const getCards = () => {
  return fetch(`${currentUser.currentUrl}/cards`, {
    headers: currentUser.headers
  })
  .then(res => checkResponse(res))
}

//изменение данных имени и рода деятельности
export const editInfoUser = (name, about) => {
  return fetch(`${currentUser.currentUrl}/users/me`, {
    method: 'PATCH',
    headers: currentUser.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => checkResponse(res))
}

//создание моей карточки для сервера
export const createNewCard = (name, link) => {
  return fetch(`${currentUser.currentUrl}/cards`, {
    method: 'POST',
    headers: currentUser.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => checkResponse(res))
}

//добавление лайка фотографии
export const pushLike = (idCard) => {
  return fetch(`${currentUser.currentUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: currentUser.headers
  })
  .then(res => checkResponse(res))
}

//удаление лайка с фотографии
export const deleteLike = (idCard) => {
  return fetch(`${currentUser.currentUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: currentUser.headers
  })
  .then(res => checkResponse(res))
}

//удаление карточки
export const deleteCard = (idCard) => {
  return fetch(`${currentUser.currentUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: currentUser.headers
  })
  .then(res => checkResponse(res))
}

//изменение моего аватара
export const changePhoto = (photo) => {
  return fetch(`${currentUser.currentUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: currentUser.headers,
    body: JSON.stringify({
      avatar: photo
    })
  })
  .then(res => checkResponse(res))
}

class Api {
  constructor() {

  }

  getCards() {
    
  }
}