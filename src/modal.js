 // открытие моального окна
 function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
 };


 //  закрытие модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);

 };

 // закрытие модалки кнопкой escape
function closeEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup  = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
      
    }
 };

 //// закрытие модалки по клику на крести и вне пределов картинки-попапа
function clickClose(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      const openedPopup  = evt.currentTarget;
      closeModal(openedPopup);
    } 
 };
 
 export {openModal,closeModal,closeEsc,clickClose};
