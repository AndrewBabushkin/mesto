// Открытие и закрытие попапа.
const editElem = document.querySelector(".profile__button_type_edit");
const popupElem = document.querySelector(".popup");

const onOpen = function (popup) {
  popup.classList.add("popup_opened");
};

const onClose = function (popup) {
  popup.classList.remove("popup_opened");
};

editElem.addEventListener("click", function () {
  onOpen(popupElem);
});

popupElem.addEventListener("click", function (event) {
  const isOverlay = event.target.classList.contains("popup_opened");
  const isClose = event.target.classList.contains("popup__close");
  if (isOverlay || isClose) {
    onClose(popupElem);
  }
});

// Редактирование информации и себе.

let formElement = document.querySelector(".popup__form-edit");
let nameInput = formElement.querySelector(".popup__text_name_edit");
let professionInput = formElement.querySelector(".popup__text_profession_edit");
let nameProfile = document.querySelector(".profile__name");
let professionProfile = document.querySelector(".profile__profession");

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.value;
  professionInput.value;

  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = professionInput.value;

  onClose(popupElem);
}

formElement.addEventListener("submit", formSubmitHandler);
