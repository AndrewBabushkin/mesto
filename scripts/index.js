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
const tegTemplate = document.querySelector("#card-template").content;
const cardTemplate = tegTemplate.querySelector(".gallery__list-item");

// попап zoom image

const popupZoomImage = document.querySelector(".popup_type_zoom");
const figcaption = popupZoomImage.querySelector(".popup__figcaption");
const largeImage = popupZoomImage.querySelector(".popup__image");

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

//  функции удаления карточек и изменения цвета сердечка

const handleDeleteCard = (event) => {
  event.target.closest(".gallery__list-item").remove();
};

const handleLikeCard = (event) => {
  event.target.classList.toggle("card__heart-button_active");
};

// создание карточки

const generateCard = (cardElement) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardTitle = newCard.querySelector(".card__title");
  cardTitle.textContent = cardElement.name;

  const cardImage = newCard.querySelector(".card__image");
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;

  const buttonDeleteCard = newCard.querySelector(".card__delete-btn");
  buttonDeleteCard.addEventListener("click", handleDeleteCard);

  const buttonLikeCard = newCard.querySelector(".card__heart-button");
  buttonLikeCard.addEventListener("click", handleLikeCard);
  // открытие большой фотографии
  cardImage.addEventListener("click", () => {
    openPopup(popupZoomImage);
    figcaption.textContent = cardElement.name;
    largeImage.src = cardElement.link;
    largeImage.alt = cardElement.name;
  });

  return newCard;
};

// Вставка карточки
const renderCard = (cardElement) => {
  galleryContainer.prepend(generateCard(cardElement));
};
// перебор массива
initialCards.forEach((cardElement) => {
  renderCard(cardElement);
});

function handleAddFormSubmit(event) {
  event.preventDefault();
  renderCard({ name: inputTitle.value, link: inputImage.value });
  formAddCart.reset();

  closePopup(popupAddCard);
}

buttonEdit.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent;
  professionInput.value = professionProfile.textContent;
  blockButton(buttonSaveProfile, settings);
});
buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  blockButton(buttonSaveCard, settings);
});
formEditProfile.addEventListener("submit", handleformSubmit);
formAddCart.addEventListener("submit", handleAddFormSubmit);
