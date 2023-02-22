const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.cards-template').content;
const cardAddButton = document.querySelector('.profile__add-button');


const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const popupCloseButtonsList = document.querySelectorAll('.popup__close-button');

const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupTypeProfile.querySelector('.popup-form_type_profile-form');
const popupProfileName = popupProfileForm.querySelector('.popup-form__input_type_username');
const popupProfileDescription = popupProfileForm.querySelector('.popup-form__input_type_user-description');
const popupProfileSubmitButton = popupProfileForm.querySelector('.popup-form__button');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = popupTypeNewCard.querySelector('.popup-form_type_new-card-form');
const popupNewCardName = popupNewCardForm.querySelector('.popup-form__input_type_card-name');
const popupNewCardLink = popupNewCardForm.querySelector('.popup-form__input_type_card-link');
const popupNewCardSubmitButton = popupNewCardForm.querySelector('.popup-form__button');

const popupTypeShowCard = document.querySelector('.popup_type_show-card');
const popupImage = popupTypeShowCard.querySelector('.popup__image');
const popupImageCaption = popupTypeShowCard.querySelector('.popup__image-caption');

const validationOptions = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__button',
  inactiveButtonClass: 'popup-form__button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_visible'
};


/*  form validation  */

const showInputError = (formElement, inputElement, validationMessage, {inputErrorClass, errorClass, ...args}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...args}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const validateInput = (formElement, inputElement, errorClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClasses);
  } else {
    hideInputError(formElement, inputElement, errorClasses);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if ( hasInvalidInput(inputList) ) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const refreshForm = (formElement, {inputSelector, inputErrorClass, errorClass, inactiveButtonClass, submitButtonSelector, ...args}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
  });
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass,inputErrorClass, errorClass, ...args}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement, {inputErrorClass, errorClass});
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (validationOptions) => {
  const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));

  formList.forEach(formElement => setEventListeners(formElement, validationOptions));
};



function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.cards__list-item').remove();
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function showCardPopup(source) {
   return (evt) => {
    evt.preventDefault();

    popupImage.src = source.link;
    popupImage.alt = source.name;
    popupImageCaption.textContent = source.name;

    showPopup(popupTypeShowCard);
   };
}

function createCard(source) {
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = source.link;
  cardImage.alt = source.name;

  card.querySelector('.card__title').textContent = source.name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.card__like-button').addEventListener('click', toggleCardLike);
  card.querySelector('.card__link').addEventListener('click', showCardPopup(source) );

  return card;
}

function drawCard(targetContainer, card) {
  targetContainer.prepend( createCard(card) );
}

function fillInitialCards() {
  initialCards.forEach(item => {
    drawCard(cardsList, item);
  });
}


function openProfilePopup() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;

  refreshForm(popupProfileForm, validationOptions);

  showPopup(popupTypeProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;

  closePopup(popupTypeProfile);
}


function openNewCardPopup() {
  popupNewCardForm.reset();

  refreshForm(popupNewCardForm, validationOptions);

  showPopup(popupTypeNewCard);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  drawCard(
    cardsList,
    {
      name: popupNewCardName.value,
      link: popupNewCardLink.value
    }
  );

  closePopup(popupTypeNewCard);
}

function handleClosePopup(closeButton) {
  return () => {
    return closePopup( closeButton.closest('.popup') );
  };
}



enableValidation(validationOptions);


document.addEventListener('DOMContentLoaded', fillInitialCards);

popupCloseButtonsList.forEach(closeButton => {
  closeButton.addEventListener('click', handleClosePopup(closeButton) );
});

cardAddButton.addEventListener('click', openNewCardPopup);
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

editProfileButton.addEventListener('click', openProfilePopup);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
