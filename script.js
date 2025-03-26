const userRegex = /^(?=.*[a-z])(?=.*[0-9]).{6,10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const emailRegex = /^\S+@\S+\.\S+$/;
const phonenumberRegex = /^[0-9]{6,16}$/;

//selectors
const countries = document.querySelector("#countries");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneCode = document.querySelector("#phonecode");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const formBtn = document.querySelector("#form-btn");
const form = document.querySelector("#form");

// Evitar espacios en los campos de entrada
const inputs = [usernameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput];

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    // Eliminar espacios del valor del campo
    event.target.value = event.target.value.replace(/\s+/g, "");
  });
});

// validation
let userNameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;
let countriesValidation = false;

// function
const validation = (event, validation, element) => {
  const information = event.target.parentElement.children[1];
  formBtn.disabled = !(
    userNameValidation &&
    emailValidation &&
    phoneValidation &&
    passwordValidation &&
    confirmPasswordValidation &&
    countriesValidation
  )
    ? true
    : false;
  if (validation) {
    element.classList.add("correct");
    element.classList.remove("incorrect");
    information.classList.remove("show-information");
  } else {
    element.classList.add("incorrect");
    element.classList.remove("correct");
    information.classList.add("show-information");
  }
};

// convertir el listado de paises a un array y dejar solo el nombre del pais
[...countries].forEach((option) => {
  option.innerHTML = option.innerHTML.replace(/\(\+\d+\)/, '').trim();	
});

usernameInput.addEventListener("input", (event) => {
  userNameValidation = userRegex.test(event.target.value);
  validation(event, userNameValidation, usernameInput);
  // userNameValidation = userRegex.test(e.target.value);
  // const information = e.target.parentElement.children[1];
  // if (userNameValidation) {
  //     usernameInput.classList.add('correct');
  //     usernameInput.classList.remove('incorrect');
  //     information.classList.remove('show-information');
  // }else{
  //     usernameInput.classList.add('incorrect');
  //     usernameInput.classList.remove('correct');
  //     information.classList.add('show-information');
  // }
});

emailInput.addEventListener("input", (event) => {
  emailValidation = emailRegex.test(event.target.value);
  validation(event, emailValidation, emailInput);
});

countries.addEventListener("input", (event) => {
  const optionSelected = [...event.target.children].find(
    (option) => option.selected
  );
  phoneCode.innerHTML = `+${optionSelected.value}`;
  countriesValidation = optionSelected.value === "" ? false : true;
  countries.classList.add("correct");
  phoneCode.classList.add("correct");
  validation(event, null, null);
});

phoneInput.addEventListener("input", (event) => {
  phoneValidation = phonenumberRegex.test(event.target.value);
  const information = event.target.parentElement.parentElement.children[1];
  if (phoneValidation) {
    phoneInput.classList.add("correct");
    phoneInput.classList.remove("incorrect");
    information.classList.remove("show-information");
  } else {
    phoneInput.classList.add("incorrect");
    phoneInput.classList.remove("correct");
    information.classList.add("show-information");
  }
});

passwordInput.addEventListener("input", (event) => {
  passwordValidation = passwordRegex.test(event.target.value);
  validation(event, passwordValidation, passwordInput);
  if ((confirmPasswordInput.value !== "") || (confirmPasswordInput.value === "" && confirmPasswordValidation === true)) {
    confirmPasswordValidation =
      passwordValidation && passwordInput.value === confirmPasswordInput.value;
    validation(
      { target: confirmPasswordInput },
      confirmPasswordValidation,
      confirmPasswordInput
    );
  }
});

confirmPasswordInput.addEventListener("input", (event) => {
  confirmPasswordValidation =
    passwordValidation && passwordInput.value === event.target.value;
  validation(event, confirmPasswordValidation, confirmPasswordInput);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    phone: `${phoneCode.innerHTML} ${phoneInput.value}`,
    password: passwordInput.value,
  };
  console.log(user);
  alert(`Your data has been submitted:
    Username: ${user.username}
    Email: ${user.email}
    Phone: ${user.phone}`);
});
