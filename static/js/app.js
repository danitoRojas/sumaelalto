const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
// Identifica los elementos del formulario y los pasos
const form = document.querySelector(".sign-up-form");
const formSteps = form.querySelectorAll(".signup-step");

// Oculta todos los pasos, excepto el primero
formSteps.forEach((step, index) => {
  if (index !== 0) {
    step.style.display = "none";
  }
});

// Función para mostrar el paso especificado y ocultar los demás
function showStep(stepNumber) {
  formSteps.forEach((step, index) => {
    if (index + 1 === stepNumber) {
      step.style.display = "block";
    } else {
      step.style.display = "none";
    }
  });
}

// Manejador de eventos para los botones de siguiente y anterior
form.addEventListener("click", (event) => {
  if (event.target.classList.contains("next-step")) {
    const nextStep = event.target.dataset.step;
    showStep(parseInt(nextStep));
  } else if (event.target.classList.contains("prev-step")) {
    const prevStep = event.target.dataset.step;
    showStep(parseInt(prevStep));
  }
});
