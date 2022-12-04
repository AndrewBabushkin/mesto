// функция добавления ошибки ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input-field_type_error");
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add("popup__input-error_active");
};
// функция удаления ошибки ввода
const hideInputError = (formElement, inputElement) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input-field_type_error");
  errorSpan.classList.remove("popup__input-error_active");
  errorSpan.textContent = "";
};

// Проверка валидации
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Добавление обработчика полей ввода
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__input-field")
  );
  const buttonElement = formElement.querySelector(".popup__save-button");
  buttonElement.disabled = true;
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Проверка кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__save-button_inactive");
    buttonElement.disabled = false;
  }
};

// функция включения валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form-edit"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: ".popup__form-edit",
  inputSelector: ".popup__input-field",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
});
