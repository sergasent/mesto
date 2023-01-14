let popupWrapper = document.querySelector('.popup');


/*  Close edit profile form function  */

function closeProfilePopup() {
  popupWrapper.setAttribute('aria-hidden', 'true');
  popupWrapper.classList.remove('popup_visible');
}


/*  Open edit profile form  */

let editProfileBtn = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.profile-form__input_type_username');
let profileDescriptionInput = document.querySelector('.profile-form__input_type_description');

editProfileBtn.addEventListener('click', function () {
  popupWrapper.setAttribute('aria-hidden', 'undefined');
  popupWrapper.classList.add('popup_visible');

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});


/*  Save changes  */

let saveProfileBtn = document.querySelector('.profile-form__save-button');

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeProfilePopup();
}

saveProfileBtn.addEventListener('click', handleFormSubmit);


/*  Close edit profile form by click on close-button  */

let editPopupCloseBtn = document.querySelector('.popup__close-button');

editPopupCloseBtn.addEventListener('click', closeProfilePopup);
