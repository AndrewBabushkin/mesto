class Card {
  constructor(cardData, cardTemplate, handleOpenZoomImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
    this._handleOpenZoomImage = handleOpenZoomImage;
  }
  //копируем карточку
  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".gallery__list-item")
      .cloneNode(true);

    return cardElement;
  }
  // наполняем данными
  _setData() {
    const cardTitle = this._newCard.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }
  // удаление карточки
  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }
  // функция лайка
  _handleLikeCard() {
    this._buttonLikeCard.classList.toggle("card__heart-button_active");
  }

  // слушатели событий
  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleOpenZoomImage(this._name, this._link)
    );

    const buttonDeleteCard = this._newCard.querySelector(".card__delete-btn");
    buttonDeleteCard.addEventListener("click", () => this._handleDeleteCard());

    this._buttonLikeCard.addEventListener("click", () =>
      this._handleLikeCard()
    );
  }

  // показываем новую карточку
  generateCard() {
    this._newCard = this._getTemplateCard();
    this._cardImage = this._newCard.querySelector(".card__image");
    this._buttonLikeCard = this._newCard.querySelector(".card__heart-button");
    this._setEventListeners();
    this._setData();

    return this._newCard;
  }
}

export { Card };
