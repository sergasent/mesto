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


const editProfileBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const popup = document.querySelector('.popup');
const popupProfileForm = document.querySelector('.profile-form');
const popupProfileName = document.querySelector('.profile-form__input_type_username');
const popupProfileDescription = document.querySelector('.profile-form__input_type_description');
const popupCloseBtn = document.querySelector('.popup__close-button');


function addCards(...cards) {
  cards.forEach(item => {
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;

    card.querySelector('.card__title').textContent = item.name;

    cardsList.prepend(card);
  });
}

function fillInitialCards() {
  addCards(...initialCards);
}


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

document.addEventListener('DOMContentLoaded', fillInitialCards);

//cardAddButton.addEventListener('click', fillInitialCards);


editProfileBtn.addEventListener('click', openProfilePopup);

popupProfileForm.addEventListener('submit', handleFormSubmit);

popupCloseBtn.addEventListener('click', closePopup);
