const forms = document.querySelector(".popup__form-edit");
const validators = {
  editName: validateUserName,
  editProfession: validateAboutMe,
  editTitle: validateTitleCard,
  editImage: validateImageUrl,
};
function validate(key, value) {
  const validator = validators[key];
  return validator(value);
}

function setError(key, errorMessage) {
  const inputEl = inputsContainer.querySelector(`.form__input[name=${key}]`);
  let errorEl = inputsContainer.querySelector(`.form__error[data-key=${key}]`);

  if (!errorEl) {
    errorEl = document.createElement("p");
    inputEl.after(errorEl);
  }

  inputEl.classList.add("form__input_invalid");
  errorEl.classList.add("form__error");
  errorEl.dataset.key = key;
  errorEl.textContent = errorMessage;
}

forms.addEventListener("input", (event) => {
  const key = event.target.name;
  const value = event.target.value;
  const formData = new FormData(event.currentTarget);
  const values = Object.fromEntries(formData);

  const errorMessage = validate(key, value);
});
console.log(formData);

// Валидация полей ввода
function validateUserName(value) {
  if (!value) {
    return "Вы пропустили это поле.";
  }

  if (value.length < 2 && value.length > 40) {
    return "в поле «Имя» должно быть от 2 до 40 символов.";
  }

  return null;
}

function validateAboutMe(value) {
  if (!value) {
    return "Вы пропустили это поле.";
  }

  if (value.length < 2 && value.length > 200) {
    return "в поле «О себе» должно быть от 2 до 200 символов.;";
  }

  return null;
}

function validateTitleCard(value) {
  if (!value) {
    return "Вы пропустили это поле.";
  }

  return null;
}

function validateImageUrl(value) {
  if (!value) {
    return "Вы пропустили это поле.";
  }
  // проверка ссылки
  try {
    new URL(value);
    return null;
  } catch {
    return "в поле «О себе» должно быть от 2 до 200 символов.;";
  }

  return null;
}
