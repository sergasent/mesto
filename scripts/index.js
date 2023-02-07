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


const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.cards__template').content;
const cardAddButton = document.querySelector('.profile__add-button');


const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const popupCloseButtonsList = document.querySelectorAll('.popup__close-button');

const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = document.querySelector('.profile-form');
const popupProfileName = document.querySelector('.profile-form__input_type_username');
const popupProfileDescription = document.querySelector('.profile-form__input_type_description');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document.querySelector('.new-card-form');
const popupNewCardName = document.querySelector('.new-card-form__input_type_name');
const popupNewCardLink = document.querySelector('.new-card-form__input_type_link');


function createCard(source) {
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = source.link;
  cardImage.alt = source.name;

  card.querySelector('.card__title').textContent = source.name;

  //  TODO
  //  Навесить события

  return card;
}

function drawCard(card) {
  cardsList.prepend( createCard(card) );
}

function fillInitialCards() {
  initialCards.forEach(item => {
    drawCard(item);
  });
}


function toggleShowPopup(popup) {
  popup.classList.toggle('popup_opened');
}


function openProfilePopup() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;

  toggleShowPopup(popupTypeProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;

  toggleShowPopup(popupTypeProfile);
}


function openNewCardPopup() {
  popupNewCardName.value = '';
  popupNewCardLink.value = '';

  toggleShowPopup(popupTypeNewCard);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  drawCard({
    name: popupNewCardName.value,
    link: popupNewCardLink.value
  });

  toggleShowPopup(popupTypeNewCard);
}


document.addEventListener('DOMContentLoaded', fillInitialCards);

popupCloseButtonsList.forEach(closeButton => {
  const handleClosePopup = () => {
    return toggleShowPopup( closeButton.closest('.popup') );
  };

  closeButton.addEventListener('click', handleClosePopup);
});

cardAddButton.addEventListener('click', openNewCardPopup);
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

editProfileButton.addEventListener('click', openProfilePopup);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

