const toggleCardLike = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
}

const deleteCard = (evt) => {
  evt.target.closest('.cards__list-item').remove();
}

const handleKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
};

const showPopup = (popup)  => {
  document.addEventListener('keydown', handleKeyPress);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', handleKeyPress);
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

const handleClosePopup = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button') ) {
    closePopup(evt.currentTarget);
  }
};



fillInitialCards();

enableValidation(validationOptions);

popupsList.forEach(popup => popup.addEventListener('click', handleClosePopup));


cardAddButton.addEventListener('click', openNewCardPopup);
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);

editProfileButton.addEventListener('click', openProfilePopup);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
