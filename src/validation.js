//объект с селекторами

/*{
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.popup__input-error',
  errorClass: '.popup__message-error-active'
}*/





const clearValidation = (config, formElem) => {
    const inputList = Array.from(formElem.querySelectorAll(config.inputSelector));
    const buttonElement = formElem.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.value = '';
      hideError(config, formElem, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  }

  const hasValidInput = (inputList) => {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }
  
  const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasValidInput(inputList)) {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
    else {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }
  
  const showError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass); // красная линия ошибки
    errorElement.textContent = errorMessage;          // текст ошибки
    errorElement.classList.add(config.errorClass); // показать ошибку
  };
  
  const hideError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  
  // проверка валидности
  const checkInputValidity = (config, formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      showError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideError(config, formElement, inputElement);
    }
  };
  
  // добавление слушателей
  const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
      });
    });
  };
  
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      
      setEventListeners(config, formElement);
    });
  }
  
 export {clearValidation, enableValidation} 