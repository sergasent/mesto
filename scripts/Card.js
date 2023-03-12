export class Card {
  constructor(data, templateSelector, showCardPopupFunc) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._showCardPopupFunc = showCardPopupFunc;
  }

  _toggleCardLike(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.cards__list-item').remove();
  }


  createCard() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const card = cardTemplate.cloneNode(true);

    const cardImage = card.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    card.querySelector('.card__title').textContent = this._name;
    card.querySelector('.card__delete-button').addEventListener('click', this._deleteCard);
    card.querySelector('.card__like-button').addEventListener('click', this._toggleCardLike);

    if (this._showCardPopupFunc) {
      card.querySelector('.card__link').addEventListener('click', this._showCardPopupFunc({
        name: this._name,
        link: this._link
      }));
    }

    return card;
  }
}
