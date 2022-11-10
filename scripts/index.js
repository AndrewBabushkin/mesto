const editElem = document.querySelector(".profile__button_type_edit");
const popupElem = document.querySelector(".popup");
const closeEdit = popupElem.querySelector(".popup__close-button");

const formElement = document.querySelector(".popup__form-edit");
let nameInput = formElement.querySelector(".popup__input-field_type_name");
let professionInput = formElement.querySelector(
  ".popup__input-field_type_profession"
);
let nameProfile = document.querySelector(".profile__name");
let professionProfile = document.querySelector(".profile__profession");

const onOpen = function (popup) {
  popup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  professionInput.value = professionProfile.textContent;
};

const onClose = function (popup) {
  popup.classList.remove("popup_opened");
};

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = professionInput.value;

  onClose(popupElem);
}

formElement.addEventListener("submit", formSubmitHandler);

editElem.addEventListener("click", function () {
  onOpen(popupElem);
});

closeEdit.addEventListener("click", function () {
  onClose(popupElem);
});
