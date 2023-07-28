export const validateField = (value, validations) => {
  let error = "";

  if (validations.isPasswordMatch && value !== validations.password) {
    error = "Пароль не совпадает";
  }
  if (validations.isEmpty && value.trim() === "") {
    error = "Это обязательное поле";
  }
  if (validations.minLength && value.length < validations.minLength) {
    error = `Должно быть не менее ${validations.minLength} символов`;
  }
  if (validations.maxLength && value.length > validations.maxLength) {
    error = `Должно быть не более ${validations.maxLength} символов`;
  }
  if (validations.isEmail && value.trim() !== "" && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
    error = "Введите корректный email";
  }
  if (validations.isEmpty && value.trim() === "") {
    error = "Это обязательное поле";
  }

  return error;
};

export const isPasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};
