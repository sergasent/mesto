const editProfileBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const popup = document.querySelector('.popup');
const popupProfileForm = document.querySelector('.profile-form');
const popupProfileName = document.querySelector('.profile-form__input_type_username');
const popupProfileDescription = document.querySelector('.profile-form__input_type_description');
const popupCloseBtn = document.querySelector('.popup__close-button');


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
