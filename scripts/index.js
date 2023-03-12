import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const cardsList = document.querySelector('.cards__list');
const cardAddButton = document.querySelector('.profile__add-button');


const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const popupsList = Array.from(document.querySelectorAll('.popup'));

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

const formsList = Array.from(document.querySelectorAll(validationOptions.formSelector));

const initialCards = [
  {
    name: "Байкал",
    link: "./images/cards/564/baikal.jpg"
  },
  {
    name: "Алтай, Чемал",
    link: "./images/cards/564/chemal,altai.jpg"
  },
  {
    name: "Эльбрус",
    link: "./images/cards/564/elbrus.jpg"
  },
  {
    name: "Камчатка",
    link: "./images/cards/564/kamchatka.jpg"
  },
  {
    name: "Великий Новгород",
    link: "./images/cards/564/velikiy-novgorod.jpg"
  },
  {
    name: "Волгоград",
    link: "./images/cards/564/volgograd.jpg"
  },
];


const handleKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
};

const showPopup = (popup)  => {
  document.addEventListener('keydown', handleKeyPress);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', handleKeyPress);
  popup.classList.remove('popup_opened');
}


const showCardPopup = (source) => {
   return (evt) => {
    evt.preventDefault();

    popupImage.src = source.link;
    popupImage.alt = source.name;
    popupImageCaption.textContent = source.name;

    showPopup(popupTypeShowCard);
   };
}


const drawCard = (targetContainer, card) => {
  const newCard = new Card(card, '.cards-template', showCardPopup);
  targetContainer.prepend( newCard.createCard() );
}

const fillInitialCards = () => {
  initialCards.forEach(item => {
    drawCard(cardsList, item);
  });
}


const openProfilePopup = () => {
  popupProfileForm.reset();

  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;

  showPopup(popupTypeProfile);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;

  closePopup(popupTypeProfile);
}


const openNewCardPopup = () => {
  popupNewCardForm.reset();

  showPopup(popupTypeNewCard);
}

const handleNewCardFormSubmit = (evt) => {
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

const handleClosePopup = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button') ) {
    closePopup(evt.currentTarget);
  }
};


fillInitialCards();

popupsList.forEach(popup => popup.addEventListener('mousedown', handleClosePopup));


formsList.forEach(form => {
  new FormValidator(validationOptions, form).enableValidation();
});

cardAddButton.addEventListener('click', openNewCardPopup);
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

editProfileButton.addEventListener('click', openProfilePopup);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
