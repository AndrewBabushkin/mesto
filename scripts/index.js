// открытие попапа edit и закрытие

const buttonEdit = document.querySelector(".profile__button_type_edit");
const popupElem = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupCloseBtn = document.querySelectorAll(".popup__close-button");

// редактирование имени

const formElement = document.querySelector(".popup__form-edit");
const nameInput = formElement.querySelector(".popup__input-field_type_name");
const professionInput = formElement.querySelector(
  ".popup__input-field_type_profession"
);
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");

// попап редактирования карточек с фотографиями

const buttonAddCard = document.querySelector(".profile__button_type_add");
const popupAddCard = document.querySelector(".popup_type_add-card");

// добавление новой карточки из формы

const formAddCart = popupAddCard.querySelector(".popup__form-edit_card");
const inputTitle = formAddCart.querySelector(".popup__input-field_type_title");
const inputImage = formAddCart.querySelector(".popup__input-field_type_image");

// cоздание карточек

const galleryContainer = document.querySelector(".gallery__list");
const tegTemplate = document.querySelector("#card-template").content;
const cardTemplate = tegTemplate.querySelector(".gallery__list-item");

// попап zoom image

const popupZoomImage = document.querySelector(".popup_type_zoom");
const figcaption = popupZoomImage.querySelector(".popup__figcaption");
const largeImage = popupZoomImage.querySelector(".popup__image");

// функция открытия попап edit
const openPopup = (index) => {
  popupElem[index].classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

//  обработчик крестиков
popupCloseBtn.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
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
  event.target
    .closest(".card__heart-button")
    .classList.toggle("card__heart-button_active");
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
    openPopup(2);
    figcaption.textContent = cardElement.name;
    formAddCart.reset();
  });

  return newCard;
};

// Вставка карточки
const renderCard = (cardElement) => {
  galleryContainer.prepend(generateCard(cardElement));
};
// обработка массива
initialCards.forEach((cardElement) => {
  renderCard(cardElement);
});

function handleAddFormSubmit(event) {
  event.preventDefault();
  renderCard({ name: inputTitle.value, link: inputImage.value });
  inputTitle.value = "";
  inputImage.value = "";

  closePopup(popupAddCard);
}

buttonEdit.addEventListener("click", () => {
  openPopup(0);
  nameInput.value = nameProfile.textContent;
  professionInput.value = professionProfile.textContent;
});
buttonAddCard.addEventListener("click", () => {
  openPopup(1);
});
formElement.addEventListener("submit", handleformSubmit);
formAddCart.addEventListener("submit", handleAddFormSubmit);
