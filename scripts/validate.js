// функция добавления ошибки ввода
const showInputError = (formElement, inputElement, settings, errorMessage) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
};
// функция удаления ошибки ввода
const hideInputError = (formElement, inputElement, settings) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorSpan.classList.remove(settings.errorClass);
  errorSpan.textContent = "";
};

// Проверка валидации
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      settings,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Добавление обработчика полей ввода
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);

      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Проверка кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList, settings)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
// блокировка кнопки при открытии попапа
const blockButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
};

// функция включения валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".popup__form-edit",
  inputSelector: ".popup__input-field",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input-field_type_error",
  errorClass: "popup__input-error_active",
});
