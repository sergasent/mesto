import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import * as constants from './constants.js';


const handleKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    closePopup(popupOpened);
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

    constants.popupImage.src = source.link;
    constants.popupImage.alt = source.name;
    constants.popupImageCaption.textContent = source.name;

    showPopup(constants.popupTypeShowCard);
   };
}


const drawCard = (targetContainer, card) => {
  const newCard = new Card(card, '.cards-template', showCardPopup);
  targetContainer.prepend( newCard.createCard() );
}

const fillInitialCards = () => {
  constants.initialCards.forEach(item => {
    drawCard(constants.cardsList, item);
  });
}


const openProfilePopup = () => {
  constants.popupProfileForm.reset();

  constants.popupProfileName.value = constants.profileName.textContent;
  constants.popupProfileDescription.value = constants.profileDescription.textContent;

  showPopup(constants.popupTypeProfile);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  constants.profileName.textContent = constants.popupProfileName.value;
  constants.profileDescription.textContent = constants.popupProfileDescription.value;

  closePopup(constants.popupTypeProfile);
}


const openNewCardPopup = () => {
  constants.popupNewCardForm.reset();

  showPopup(constants.popupTypeNewCard);
}

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  drawCard(
    constants.cardsList,
    {
      name: constants.popupNewCardName.value,
      link: constants.popupNewCardLink.value
    }
  );

  closePopup(constants.popupTypeNewCard);
}

const handleClosePopup = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button') ) {
    closePopup(evt.currentTarget);
  }
};


fillInitialCards();

constants.popupsList.forEach(popup => popup.addEventListener('mousedown', handleClosePopup));


constants.formsList.forEach(form => {
  new FormValidator(constants.validationOptions, form).enableValidation();
});

constants.cardAddButton.addEventListener('click', openNewCardPopup);
constants.popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

constants.editProfileButton.addEventListener('click', openProfilePopup);
constants.popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
