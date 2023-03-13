export const cardsList = document.querySelector('.cards__list');
export const cardAddButton = document.querySelector('.profile__add-button');


export const editProfileButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');


export const popupsList = document.querySelectorAll('.popup');

export const popupTypeProfile = document.querySelector('.popup_type_profile');
export const popupProfileForm = popupTypeProfile.querySelector('.popup-form_type_profile-form');
export const popupProfileName = popupProfileForm.querySelector('.popup-form__input_type_username');
export const popupProfileDescription = popupProfileForm.querySelector('.popup-form__input_type_user-description');
export const popupProfileSubmitButton = popupProfileForm.querySelector('.popup-form__button');

export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupNewCardForm = popupTypeNewCard.querySelector('.popup-form_type_new-card-form');
export const popupNewCardName = popupNewCardForm.querySelector('.popup-form__input_type_card-name');
export const popupNewCardLink = popupNewCardForm.querySelector('.popup-form__input_type_card-link');
export const popupNewCardSubmitButton = popupNewCardForm.querySelector('.popup-form__button');

export const popupTypeShowCard = document.querySelector('.popup_type_show-card');
export const popupImage = popupTypeShowCard.querySelector('.popup__image');
export const popupImageCaption = popupTypeShowCard.querySelector('.popup__image-caption');

export const validationOptions = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__button',
  inactiveButtonClass: 'popup-form__button_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_visible'
};

export const formsList = Array.from(document.querySelectorAll(validationOptions.formSelector));

export const initialCards = [
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
