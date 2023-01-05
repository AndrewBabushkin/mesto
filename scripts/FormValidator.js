import { settings } from "./Arrays.js";

class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(settings.inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  //  показ ошибки ввода
  _showInputError(inputElement, errorMessage) {
    const errorSpan = this._form.querySelector(`.${inputElement.id}-error`);
    errorSpan.textContent = errorMessage;
    errorSpan.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
    console.log(errorSpan);
    console.log(inputElement);
    console.log(errorMessage);
  }
  //  удаление ошибки ввода
  _hideInputError(inputElement, settings) {
    const errorSpan = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = "";
  }
  // Проверка валидации
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  // проверка полей ввода
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Проверка кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._blockButton();
    } else {
      this._unBlockButton();
    }
  }
  // блокировка кнопки при открытии попапа
  _blockButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  // разблокировка кнопки
  _unBlockButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
