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
