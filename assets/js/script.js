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
const confirmPasswordInput = document.querySelector("#confirmpassword");
const strengthBar = document.querySelector("#strength-bar");
const strengthLabel = document.querySelector("#strength-label");

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
// Medidor de Força na senha
const checkStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) {
    strengthBar.style.width = "25%";
    strengthBar.style.backgroundColor = "#e74c3c";
    strengthLabel.innerText = "Franca";
    strengthLabel.style.color = "#e74c3c";
  } else if (score <= 3) {
    strengthBar.style.width = "60%";
    strengthBar.style.backgroundColor = "#f39c12";
    strengthLabel.innerText = "Média";
    strengthLabel.style.color = "#f39c12";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.backgroundColor = "#2ecc71";
    strengthLabel.innerText = "Forte";
    strengthLabel.style.color = "#2ecc71";
  }
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

    generatedPasswordElement.style.display = "none";
    generatorPasswordContainer.classList.add("hide");
    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 1500);
  });
});

// Ativação do Medidor de Força na senha
confirmPasswordInput.addEventListener("input", () => {
  if (confirmPasswordInput.value.length > 0) {
    strengthBar.closest("#password-strength").style.display = "block";
    strengthLabel.style.display = "block";
    checkStrength(confirmPasswordInput.value);
  } else {
    strengthBar.closest("#password-strength").style.display = "none";
    strengthLabel.style.display = "none";
  }
});

// Abertura e fechamento de olho na senha
document.querySelectorAll(".toggle-password").forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetId = icon.dataset.target;
    const input = document.querySelector(`#${targetId}`);
    const i = icon.querySelector("i");
    if (input.type === "password") {
      input.type = "text";
      i.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      i.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});
