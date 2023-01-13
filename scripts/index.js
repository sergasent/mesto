let popupWrapper = document.querySelector('.popup-wrapper');
let editProfileForm = document.querySelector('.edit-profile-popup');


/*  Close edit profile form function  */

function closeProfilePopup() {
  popupWrapper.setAttribute('aria-hidden', 'true');
  popupWrapper.classList.remove('popup-wrapper_visible');
  editProfileForm.classList.remove('edit-profile-popup_visible');
}


/*  Open edit profile form  */

let editProfileBtn = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.edit-profile-popup__username');
let profileDescriptionInput = document.querySelector('.edit-profile-popup__description');

editProfileBtn.addEventListener('click', function () {
  popupWrapper.setAttribute('aria-hidden', 'undefined');
  popupWrapper.classList.add('popup-wrapper_visible');
  editProfileForm.classList.add('edit-profile-popup_visible');

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});


/*  Save changes  */

let saveProfileBtn = document.querySelector('.edit-profile-popup__save-button');

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeProfilePopup();
}

saveProfileBtn.addEventListener('click', handleFormSubmit);


/*  Close edit profile form by click on close-button  */

let editPopupCloseBtn = document.querySelector('.edit-profile-popup__close-button');

editPopupCloseBtn.addEventListener('click', closeProfilePopup);
