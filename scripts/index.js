import { initialCards, settings } from "./Arrays1.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// открытие попапа edit и закрытие

const buttonEdit = document.querySelector(".profile__button_type_edit");
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const buttonsClosePopup = document.querySelectorAll(".popup__close-button");

// редактирование имени

const formEditProfile = document.querySelector(".popup__form-edit_profile");
const nameInput = formEditProfile.querySelector(
  ".popup__input-field_type_name"
);
const professionInput = formEditProfile.querySelector(
  ".popup__input-field_type_profession"
);
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");
const buttonSaveProfile = formEditProfile.querySelector(
  ".popup__save-button_type_profile"
);

// попап редактирования карточек с фотографиями

const buttonAddCard = document.querySelector(".profile__button_type_add");
const popupAddCard = document.querySelector(".popup_type_add-card");

// добавление новой карточки из формы

const formAddCart = popupAddCard.querySelector(".popup__form-edit_card");
const inputTitle = formAddCart.querySelector(".popup__input-field_type_title");
const inputImage = formAddCart.querySelector(".popup__input-field_type_image");
const buttonSaveCard = formAddCart.querySelector(
  ".popup__save-button_type_card"
);

// cоздание карточек

const galleryContainer = document.querySelector(".gallery__list");

// функция открытия попапов
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
};
const closePopupByEscape = (event) => {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

//  обработчик крестиков
buttonsClosePopup.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

popups.forEach((overlay) => {
  overlay.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      closePopup(overlay);
    }
  });
});

// обработчик профиля
function handleformSubmit(event) {
  event.preventDefault();

  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = professionInput.value;

  closePopup(popupEditProfile);
}
// обработчик формы добавления карточек
function handleAddFormSubmit(event) {
  event.preventDefault();
  renderCard({ name: inputTitle.value, link: inputImage.value });
  formAddCart.reset();

  closePopup(popupAddCard);
}

// Вставка карточки
const renderCard = (cardElement) => {
  const card = new Card(cardElement);
  galleryContainer.prepend(card.generateCard(cardElement));
};

// перебор массива
initialCards.forEach((cardElement) => {
  renderCard(cardElement);
});

// запуск валидации формы профиля
const formEditProfileValidation = new FormValidator(settings, formEditProfile);
formEditProfileValidation.enableValidation();

// запуск валидации формы добавления карточки
const formAddCardValidation = new FormValidator(settings, formAddCart);
formAddCardValidation.enableValidation();

// слушатели событий

buttonEdit.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent;
  professionInput.value = professionProfile.textContent;
  formEditProfileValidation._blockButton(buttonSaveProfile, settings);
});
buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddCardValidation._blockButton(buttonSaveCard, settings);
});

formEditProfile.addEventListener("submit", handleformSubmit);
formAddCart.addEventListener("submit", handleAddFormSubmit);
