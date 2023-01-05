import { initialCards } from "./Arrays.js";

class Card {
  constructor(initialCards) {
    this._name = initialCards.name;
    this._link = initialCards.link;
  }
  //копируем карточку
  _getTemplateCard() {
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".gallery__list-item")
      .cloneNode(true);

    return cardElement;
  }
  // наполняем данными
  _setData() {
    const cardTitle = this._newCard.querySelector(".card__title");
    cardTitle.textContent = this._name;

    const cardImage = this._newCard.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
  }
  // удаление карточки
  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  // открытие большой картинки
  _openZoomImage() {
    const popupZoomImage = document.querySelector(".popup_type_zoom");
    popupZoomImage.classList.add("popup_opened");
    const figcaption = popupZoomImage.querySelector(".popup__figcaption");
    const largeImage = popupZoomImage.querySelector(".popup__image");
    figcaption.textContent = this._name;
    largeImage.src = this._link;
    largeImage.alt = this._name;
  }

  // слушатели событий
  _setEventListeners() {
    const cardImage = this._newCard.querySelector(".card__image");
    cardImage.addEventListener("click", () => this._openZoomImage());

    const buttonDeleteCard = this._newCard.querySelector(".card__delete-btn");
    buttonDeleteCard.addEventListener("click", () => this._handleDeleteCard());

    const buttonLikeCard = this._newCard.querySelector(".card__heart-button");
    buttonLikeCard.addEventListener("click", () => {
      buttonLikeCard.classList.toggle("card__heart-button_active");
    });
  }

  // показываем новую карточку
  generateCard() {
    this._newCard = this._getTemplateCard();
    this._setEventListeners();
    this._setData();

    return this._newCard;
  }
}

export { Card };
