import './index.css'; 
import {initialCards} from './cards.js';
import {createCard,likeCard,cardDelete} from  './cards.js'
import {openModal,closeModal,closeEsc,clickClose} from './modal.js'


// @todo: Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');

// попапы
const popupEdit = document.querySelector('.popup_type_edit');  // попап редактиования профиля
const popupAddNew = document.querySelector('.popup_type_new-card');
const imagePopup =  document.querySelector('.popup_type_image');
//кнопки
const addBtn = document.querySelector('.profile__add-button');
const popupEditBtn = document.querySelector('.profile__edit-button');  // кнопка редактирования ппрофиля

//форма редактирования профиля
const editForm = document.forms['edit-profile'];


// поля формы редактирования профиля
const editProfileName = editForm.elements['name']; 
const editProfileDesc = editForm.elements['description'];

//// имя и занятие рядом с аватаркой
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//форма добавления  новой карточки
const addCardForm = document.forms['new-place'];
//поля формы добавления новой карты
const  addNewCardName = addCardForm.elements['place-name'];
const  addNewCardLink = addCardForm.elements['link'];

///попап картиинки и подписи снизу(альта)
const popupContentImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


//вешаем на кнопку добавления функцию создания карточки и передаем ей аргументами колбеками остальные функции
addCardForm.addEventListener('submit', (evt) =>{
   evt.preventDefault();
   const addNewElem = createCard(addNewCardName.value, addNewCardLink.value, cardDelete,likeCard,handleImage);
   placeList.prepend(addNewElem);
   closeModal(popupAddNew);
});


// @todo: Вывести карточки на страницу
initialCards.forEach((element ) => {
    const newCard = createCard(element.name,element.link, cardDelete,likeCard,handleImage)
    placeList.append(newCard);
});


//вешаем событие по клику на кнопку добавление (открытие попапа)
addBtn.addEventListener('click',()=>{
   openModal(popupAddNew)
});



// слушатель на кнопку редактирования профиля
popupEditBtn.addEventListener('click', () => {
   editProfileName.value = profileTitle.textContent;
   editProfileDesc.value = profileDescription.textContent

   openModal(popupEdit);  

});

// нашли все попапы циклом и добавили им плавности
document.querySelectorAll('.popup').forEach( (pop) => {
   pop.classList.add('popup_is-animated');
   pop.addEventListener('click', clickClose);
});


///функция сабмита
function handleFormSubmit(evt) {
   evt.preventDefault();
   profileTitle.textContent =  editProfileName.value;
   profileDescription.textContent = editProfileDesc.value;

   closeModal(popupEdit);
};

editForm.addEventListener('submit', handleFormSubmit)


//функция открытия картинок
function handleImage(evt) {
   popupContentImage.src = evt.target.src;
   popupContentImage.alt = evt.target.alt;
   popupCaption.textContent = evt.target.alt; 
   openModal(imagePopup);
 };


