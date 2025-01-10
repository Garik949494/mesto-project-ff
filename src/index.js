// импорты из других ветвей js
import './index.css'; 
import {initialCards} from './cards.js';/// вывод карт из массива
import {createCard,likeCard,cardDelete} from  './card.js'
import {openModal,closeModal,clickClose} from './modal.js'
import {clearValidation, enableValidation} from './validation.js'; 
import {getCards, getUser, updateProfile, postCard, updateAvatar} from './api.js';

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__message-error-activ'
  };
  
  enableValidation(validationSettings);

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');

// попапы
const popupEdit = document.querySelector('.popup_type_edit');  // попап редактиования профиля
const popupAddNew = document.querySelector('.popup_type_new-card');
const imagePopup =  document.querySelector('.popup_type_image');
const popupAvatarChange = document.querySelector('.popup_type_avatar');

//кнопки
const submitAvatarButton = popupAvatarChange.querySelector('.popup__button');
const submitbuttonOpenEditProfilePopup = popupEdit.querySelector('.popup__button');
const submitNewCardButton = popupAddNew.querySelector('.popup__button');
const addBtn = document.querySelector('.profile__add-button');
const popupEditBtn = document.querySelector('.profile__edit-button');  // кнопка редактирования ппрофиля


//// имя и занятие рядом с аватаркой
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');


//форма 
const editForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const avatarForm = document.forms['avatar-change'];


//форма добавления  новой карточки
const  addNewCardName = addCardForm.elements['place-name'];
const  addNewCardLink = addCardForm.elements['link'];

// поля формы редактирования профиля
const editProfileName = editForm.elements['name']; 
const editProfileDesc = editForm.elements['description'];
const avatarLink = avatarForm.elements['avatar-link'];

///попап картиинки и подписи снизу(альта)
const popupContentImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

let myID;

Promise.all([getUser(), getCards()])
  .then(([userData, cardsData]) => {
    myID = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    cardsData.forEach((elem) => {
      placeList.append(createCard(
        {
        title: elem.name,  // название
        img: elem.link,     // ссылка
        likesList: elem.likes, // количество лайков
        cardID: elem._id,               // идентификатор карточки
        isAuthor: elem.owner._id === myID, // true, если я - автор 
        myID: myID
        }, 
        cardDelete, likeCard, handleImage));
    });
  })
  .catch((err) => {
    console.log(err);
});


function saveProfileForm(evt) {
   evt.preventDefault();
   submitbuttonOpenEditProfilePopup.textContent = "Сохранение";
   updateProfile(profileTitle.textContent,profileDescription.textContent)
   .then( ()=>{
      profileTitle.textContent = editProfileName.value;
      profileDescription.textContent = editProfileDesc.value;
      closeModal(popupEdit);
   })
   .catch((err) => {
      console.Console.log(err);
   })
}; 

// слушатель на кнопку редактирования профиля
popupEditBtn.addEventListener('click', () => {
   clearValidation(validationSettings, editForm);
   editProfileName.value = profileTitle.textContent;
   editProfileDesc.value = profileDescription.textContent

   openModal(popupEdit);  

});


profileImage.addEventListener('click', () => {
   clearValidation(validationSettings, avatarForm);
   submitAvatarButton.textContent = 'Сохранить';
   openModal(popupAvatarChange);
 })

 popupAvatarChange.addEventListener('submit', (evt) => {
   submitAvatarButton.textContent = 'Сохранение...';
   evt.preventDefault();
   updateAvatar(avatarLink.value)
     .then( () => {
       profileImage.src = avatarLink.value;
       closeModal(popupAvatarChange);
     })
     .catch((err) => {
       console.log(err);
     })
 });

editForm.addEventListener('submit',saveProfileForm);


//вешаем на кнопку добавления функцию создания карточки и передаем ей аргументами колбеками остальные функции
addCardForm.addEventListener('submit', (evt) =>{
   evt.preventDefault();
   const addNewElem = createCard(addNewCardName.value, addNewCardLink.value, cardDelete,likeCard,handleImage);
   placeList.prepend(addNewElem);
   closeModal(popupAddNew);
});


/*// @todo: Вывести карточки на страницу
initialCards.forEach((element ) => {
    const newCard = createCard(element.name,element.link, cardDelete,likeCard,handleImage)
    placeList.append(newCard);
});*/


//вешаем событие по клику на кнопку добавление (открытие попапа)
addBtn.addEventListener('click',()=>{
   openModal(popupAddNew);
   addCardForm.reset();
});





// нашли все попапы циклом на всем документе и добавили им плавности классом
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











 addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitNewCardButton.textContent = 'Сохранение...';

  //апишка для отправки данных на сервер
  postCard( addNewCardName.value,  addNewCardLink.value)
      .then( (data) => {
        const newElem = createCard(
          {title: data.name,
          img: data.link,
          likesList: data.likes,
          cardID: data._id, 
          isAuthor: true,
          myID: myID},
          cardDelete, likeCard, handleImage);
          placeList.prepend(newElem);
      closeModal(popupNewCard);
      })
      .catch((err) => {
        console.log(err);
      })
});