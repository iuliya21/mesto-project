//авторизация на сервере
export const currentUser = {
  currentUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '5316090b-29fc-4b6a-8b2f-268d3472034e',
    'Content-Type': 'application/json'
  }
}

export class Api {
  constructor({ currentUrl, headers }) {
    this.currentUrl = currentUrl;
    this.headers = headers;
  }

  _checkResponse(res) { // приватный метод - проверка статуса запроса
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getCards() { // загрузка карточек с сервера
    return fetch(`${this.currentUrl}/cards`, {
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  getUserCurrent() { // получение данных о пользователе
    return fetch(`${this.currentUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => this._checkResponse(res))
  }

  editInfoUser(name, about) { // изменение данных пользователи и рода деятельности
    return fetch(`${this.currentUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
  }

  createNewCard(data) { // создание новой карточки
    return fetch(`${this.currentUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    })
    .then(res => this._checkResponse(res))
  }

  pushLike(idCard) { // добавление лайка фотографии
    return fetch(`${this.currentUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  deleteLike(idCard) { // удаление лайка с фотографии
    return fetch(`${this.currentUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  deleteCard(idCard) { // удаление карточки
    return fetch(`${this.currentUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  changePhoto(photo) { // изменить аватар
    return fetch(`${this.currentUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: photo
      })
    })
    .then(res => this._checkResponse(res))
  }
}