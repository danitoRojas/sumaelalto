// Obtener el campo de contraseña
const passwordField = document.getElementById("password");

// Función para validar la contraseña
function validarContrasena() {
  const password = passwordField.value;

  // Expresión regular para validar al menos un carácter
  const contieneAlMenosUnCaracter =
    /[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/;

  if (password.length < 8 || !contieneAlMenosUnCaracter.test(password)) {
    // Si la contraseña no cumple con los requisitos, mostrar un mensaje de error
    passwordField.setCustomValidity(
      "La contraseña debe tener al menos 8 caracteres y contener al menos un carácter"
    );
  } else {
    // Si la contraseña es válida, borrar el mensaje de error
    passwordField.setCustomValidity("");
  }
}
