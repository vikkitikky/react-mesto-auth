class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _sendRequest(link, params) {
    return fetch(link, params)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      });
  }

  getUserInfo() {
    return this._sendRequest(`${this._baseUrl}users/me`, {
      headers: this._headers
    });
  }

  getCard() {
    return this._sendRequest(`${this._baseUrl}cards`, {
      headers: this._headers
    })
  }

  setUserInfo(data) {
    return this._sendRequest(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  addNewCard(data) {
    return this._sendRequest(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        link: data.link,
        name: data.name
      })
    })
  }

  deleteCard(cardId) {
    return this._sendRequest(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  changeLikeStatus(cardId, isLiked) {
    return this._sendRequest(`${this._baseUrl}cards/likes/${cardId}`, {
      method: (`${isLiked ? 'PUT' : 'DELETE'}`),
      headers: this._headers
    })
  }

  setAvatar(link) {
    return this._sendRequest(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  prepareDataForRender() {
    return Promise.all([this.getUserInfo(), this.getCard()])
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/',
  headers: {
    authorization: '3f1525c8-6553-40b2-a3fa-d91718e64979',
    'Content-Type': 'application/json'
  }
});

export default api;