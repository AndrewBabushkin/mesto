//массив начальних карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// открытие попапа edit и закрытие

const editElem = document.querySelector(".profile__button_type_edit");
const popupElem = document.querySelector(".popup");
const closeEdit = document.querySelectorAll(".popup__close-button");

// редактирование имени

const formElement = document.querySelector(".popup__form-edit");
let nameInput = formElement.querySelector(".popup__input-field_type_name");
let professionInput = formElement.querySelector(
  ".popup__input-field_type_profession"
);
let nameProfile = document.querySelector(".profile__name");
let professionProfile = document.querySelector(".profile__profession");

// попап редактирования карточек с фотографиями

const addButton = document.querySelector(".profile__button_type_add");
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
const onOpen = (popup) => {
  popup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  professionInput.value = professionProfile.textContent;
};

const onClose = (popup) => {
  popup.classList.remove("popup_opened");
};

const openAddСard = (popupAddCard) => {
  popupAddCard.classList.add("popup_opened");
};

const openZoomPopup = (popupZoomImage) => {
  popupZoomImage.classList.add("popup_opened");
};

//  обработчик крестиков
closeEdit.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    onClose(popup);
  });
});

// обработчик профиля
function handlerformSubmit(event) {
  event.preventDefault();

  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = professionInput.value;

  onClose(popupElem);
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

  const deleteCardBtn = newCard.querySelector(".card__delete-btn");
  deleteCardBtn.addEventListener("click", handleDeleteCard);

  const likeCardBtn = newCard.querySelector(".card__heart-button");
  likeCardBtn.addEventListener("click", handleLikeCard);
  // открытие большой фотографии
  cardImage.addEventListener("click", () => {
    openZoomPopup(popupZoomImage);
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
// обработка массива
initialCards.forEach((cardElement) => {
  renderCard(cardElement);
});

function handlerAddFormSubmit(event) {
  event.preventDefault();
  renderCard({ name: inputTitle.value, link: inputImage.value });
  inputTitle.value = "";
  inputImage.value = "";

  onClose(popupAddCard);
}

editElem.addEventListener("click", function () {
  onOpen(popupElem);
});
addButton.addEventListener("click", function () {
  openAddСard(popupAddCard);
});
formElement.addEventListener("submit", handlerformSubmit);
formAddCart.addEventListener("submit", handlerAddFormSubmit);
