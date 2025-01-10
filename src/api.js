const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '659771bc-f143-40d5-bb76-0d9d77c2997f',
      'Content-Type': 'application/json'
    }
  }

const getUser = () => {
    return fetch(config.baseUrl+'/users/me', {
      method: 'GET',
      headers: config.headers
    })
    .then(res => checkStatus(res))
}
  
const getCards = () => {
      return fetch(config.baseUrl+'/cards', {
        method: 'GET',
        headers: config.headers
      })
      .then(res => checkStatus(res))
}
  
const updateProfile = (name, about) => {
    return fetch(config.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => checkStatus(res))
}
  
const postCard = (name, link) => {
    return fetch(config.baseUrl+'/cards', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => checkStatus(res))
}
  
const updateLikeValue = (cardId, isLiked) => {
    if (isLiked) {
      return fetch(config.baseUrl+'/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
      })
      .then(res => checkStatus(res))
    }
    else {
      return fetch(config.baseUrl+'/cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
      })
      .then(res => checkStatus(res))
    }
}
  
const removeCard = (cardId) => {
    return fetch(config.baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(res => checkStatus(res))
}
  
const updateAvatar = (avatar) => {
    return fetch(config.baseUrl+'/users/me/avatar', {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => checkStatus(res))
}
  
const checkStatus = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
}
  
export {getUser, getCards, updateProfile, postCard, updateLikeValue, removeCard, updateAvatar} 
  