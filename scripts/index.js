import {
  initialCards,
  settings,
  buttonEdit,
  popups,
  popupEditProfile,
  buttonsClosePopup,
  formEditProfile,
  nameInput,
  professionInput,
  nameProfile,
  professionProfile,
  buttonSaveProfile,
  buttonAddCard,
  popupAddCard,
  formAddCart,
  inputTitle,
  inputImage,
  buttonSaveCard,
  galleryContainer,
} from "./Constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
// открытие большой картинки
const handleOpenZoomImage = (nameCard, link) => {
  const popupZoomImage = document.querySelector(".popup_type_zoom");
  popupZoomImage.classList.add("popup_opened");

  const figcaption = popupZoomImage.querySelector(".popup__figcaption");
  const largeImage = popupZoomImage.querySelector(".popup__image");
  figcaption.textContent = nameCard;
  largeImage.src = link;
  largeImage.alt = nameCard;
  document.addEventListener("keydown", closePopupByEscape);
};

//}

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
function handleProfileFormSubmit(event) {
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
  const card = new Card(cardElement, "#card-template", handleOpenZoomImage);
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
  formEditProfileValidation.blockButton(buttonSaveProfile, settings);
});
buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddCardValidation.blockButton(buttonSaveCard, settings);
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCart.addEventListener("submit", handleAddFormSubmit);
