// @todo: Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');
// @todo: Функция создания карточки
 function createCard(card, deleteCallback){
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
    cardContent.querySelector('.card__title').textContent = card.name;
    cardContent.querySelector('.card__image').src = card.link;
    const deleteButton = cardContent.querySelector('.card__delete-button');  //присвоили переменной  deleteButton класс кнопки удаления
    deleteButton.addEventListener('click', () => deleteCallback(cardContent));       // хочу присвоить переменной кнопки удаления событие удаления по клику через callback
        
    
    return cardContent;
}
// @todo: Функция удаления карточки
 function cardDelete(cardContent){
    cardContent.remove()
 }

// @todo: Вывести карточки на страницу

    initialCards.forEach((element) => {
    const newCard = createCard(element, cardDelete)
    placeList.append(newCard);
  })