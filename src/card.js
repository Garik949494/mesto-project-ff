// @todo: Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(title,img, deleteCallback,handlerlike, handlerOpen){
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
    
    const deleteButton = cardContent.querySelector('.card__delete-button');  //присвоили переменной  deleteButton класс кнопки удаления
    deleteButton.addEventListener('click', () => deleteCallback(cardContent));       // хочу присвоить переменной кнопки удаления событие удаления по клику через callback
        
    const cardLikeButton = cardContent.querySelector('.card__like-button'); // кнопка лайка
    cardLikeButton.addEventListener('click', handlerlike);
   
   
    cardContent.querySelector('.card__title').textContent = title;

  
    const cardImage = cardContent.querySelector('.card__image');
    cardImage.alt = title
    cardImage.src = img


    cardImage.addEventListener('click', (evt) => {
     handlerOpen(evt);
    });

   return cardContent;
};


// @todo: Функция удаления карточки
function cardDelete(cardContent){
  cardContent.remove()
};

//функция тогла лайка
const likeCard = (evt) => { 
   evt.target.classList.toggle('card__like-button_is-active');
};

export {createCard,likeCard,cardDelete};