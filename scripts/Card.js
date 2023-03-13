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

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__list-item')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._card.querySelector('.card__delete-button').addEventListener('click', this._deleteCard);
    this._card.querySelector('.card__like-button').addEventListener('click', this._toggleCardLike);

    this._card.querySelector('.card__link').addEventListener('click', this._showCardPopupFunc({
      name: this._name,
      link: this._link
    }));
  }

  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._card.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._card.querySelector('.card__title').textContent = this._name;

    return this._card;
  }
}
