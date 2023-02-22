const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.cards-template').content;
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


const toggleCardLike = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
}

const deleteCard = (evt) => {
  evt.target.closest('.cards__list-item').remove();
}

const handleKeyPress = (evt) => {
  if (evt.key === 'Escape') closePopup(evt.currentTarget);
};

const showPopup = (popup)  => {
  popup.addEventListener('keydown', handleKeyPress);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.removeEventListener('keydown', handleKeyPress);
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

const createCard = (source) => {
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

const drawCard = (targetContainer, card) => {
  targetContainer.prepend( createCard(card) );
}

const fillInitialCards = () => {
  initialCards.forEach(item => {
    drawCard(cardsList, item);
  });
}


const openProfilePopup = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;

  refreshForm(popupProfileForm, validationOptions);

  showPopup(popupTypeProfile);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  //  Prevent invalid submit by click Enter
  if ( hasInvalidInput(Array.from(evt.target.elements)) ) return;

  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;

  closePopup(popupTypeProfile);
}


const openNewCardPopup = () => {
  popupNewCardForm.reset();

  refreshForm(popupNewCardForm, validationOptions);

  showPopup(popupTypeNewCard);
}

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  if ( hasInvalidInput(Array.from(evt.target.elements)) ) return;

  drawCard(
    cardsList,
    {
      name: popupNewCardName.value,
      link: popupNewCardLink.value
    }
  );

  closePopup(popupTypeNewCard);
}

const handleClosePopup = (evt, popup) => {
  if ( ['popup', 'popup__close-button'].some(itemClass => {
    return evt.target.classList.contains(itemClass);
  }) ) {
    closePopup(popup);
  }
};


document.addEventListener('DOMContentLoaded', fillInitialCards);

enableValidation(validationOptions);

popupsList.forEach(popup => {
  popup.addEventListener('click', (evt) => handleClosePopup(evt, popup) );
});


cardAddButton.addEventListener('click', openNewCardPopup);
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

editProfileButton.addEventListener('click', openProfilePopup);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
