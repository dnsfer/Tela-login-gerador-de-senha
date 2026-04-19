// Seleção de Elementos
// const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector(
  "#open-generated-password"
);

// Novas Funcionalidaddes
const openCloseGeneratorButton = document.querySelector("#generate-password");
const generatorPasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#number");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "(){}[]=></,.!@#$%¨$°-*+|";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = () => {
  let password = "";

  // Segunda Versão
  const passwordLength = +lengthInput.value;

  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }
  if (numbersInput.checked) {
    generators.push(getNumber);
  }
  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    return;
  }

  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }
  password = password.slice(0, passwordLength);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

const toast = document.querySelector("#toast");

const showToast = (message) => {
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
};
// Eventos
openCloseGeneratorButton.addEventListener("click", () => {
  generatorPasswordContainer.classList.toggle("hide");
  if (generatorPasswordContainer.classList.contains("hide")) {
    generatedPasswordElement.style.display = "none";
  }
});

document
  .querySelector("#up-password")
  .addEventListener("click", generatePassword);
copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    showToast("Senha copiada com sucesso!");
    
    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 1000);
  });
});
