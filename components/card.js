import {removeCard,updateLikeValue} from './api.js';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// cardInfo = {
// title: , 
// img: , 
// likesList: , 
// cardID: , 
// isAuthor: , 
// myID:}

// @todo: Функция создания карточки
function createCard(cardParams, deleteCallback, handlerlike, handlerOpen) {
  const cardContent = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardContent.querySelector('.card__image');
  const cardDeleteButton = cardContent.querySelector('.card__delete-button');
  const cardLikeButton = cardContent.querySelector('.card__like-button'); // кнопка лайка
  const cardLikeValue = cardContent.querySelector('.card__like-value');
  const cardId = cardParams.cardID;

  cardImage.alt = cardParams.title;
  cardImage.src = cardParams.img;

  cardLikeValue.textContent = cardParams.likesList.length;
  cardContent.querySelector('.card__title').textContent = cardParams.title;

  //чек лайка
  if (cardParams.likesList.some(list => list._id === cardParams.myID)) {
      cardLikeButton.classList.toggle('card__like-button_is-active');
  };

  if (cardParams.isAuthor) {
      cardDeleteButton.addEventListener('click', () => {
          // удаляем с сервера и с разметки
          removeCard(cardId)
              .then(() => {
                  deleteCallback(cardContent);
              })
              .catch((err) => {
                  console.log(err);
              });
      });
  }
  // иначе убрать возможность удаления
  else {
      deleteCallback(cardDeleteButton);
  }


  cardImage.addEventListener('click', (evt) => {
      handlerOpen(evt);
  });

  cardLikeButton.addEventListener('click', (evt) => {
      const isLiked = evt.target.classList.contains('card__like-button_is-active');
      // изменяем кнопку

      // вносим изменения на сервер и изменяем число лайков
      updateLikeValue(cardId, isLiked)
          .then((data) => {
              handlerlike(evt);
              cardLikeValue.textContent = data.likes.length;
          })
          .catch((err) => {
              console.log(err);
          });
  });


  return cardContent;
};


// @todo: Функция удаления карточки
function cardDelete(cardContent) {
  cardContent.remove()
};

//функция тогла лайка
const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

export {createCard, likeCard, cardDelete};