let editProfileBtn = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');


let popup = document.querySelector('.popup');
let popupProfileForm = document.querySelector('.profile-form');
let popupProfileName = document.querySelector('.profile-form__input_type_username');
let popupProfileDescription = document.querySelector('.profile-form__input_type_description');
let popupCloseBtn = document.querySelector('.popup__close-button');


function openProfilePopup() {
  popup.classList.add('popup_opened');

  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;

  closePopup();
}


editProfileBtn.addEventListener('click', openProfilePopup);

popupProfileForm.addEventListener('submit', handleFormSubmit);

popupCloseBtn.addEventListener('click', closePopup);
