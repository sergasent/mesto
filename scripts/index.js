const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.cards-template').content;
const cardAddButton = document.querySelector('.profile__add-button');


const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const popupCloseButtonsList = document.querySelectorAll('.popup__close-button');

const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = document.querySelector('.popup-form_type_profile-form');
const popupProfileName = document.querySelector('.popup-form__input_type_username');
const popupProfileDescription = document.querySelector('.popup-form__input_type_user-description');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document.querySelector('.popup-form_type_new-card-form');
const popupNewCardName = document.querySelector('.popup-form__input_type_card-name');
const popupNewCardLink = document.querySelector('.popup-form__input_type_card-link');

const popupTypeShowCard = document.querySelector('.popup_type_show-card');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');


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

document.addEventListener('DOMContentLoaded', fillInitialCards);

popupCloseButtonsList.forEach(closeButton => {
  closeButton.addEventListener('click', handleClosePopup(closeButton) );
});

cardAddButton.addEventListener('click', openNewCardPopup);
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

editProfileButton.addEventListener('click', openProfilePopup);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);


