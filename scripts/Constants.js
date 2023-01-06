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

// объект валидации
const settings = {
  inputSelector: ".popup__input-field",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input-field_type_error",
  errorClass: "popup__input-error_active",
};

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

export {
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
};
