let authService;
let registerForm;

document.addEventListener("DOMContentLoaded", () => {
  authService = new AuthService();
  registerForm = document.querySelector("#register");
  registerForm.addEventListener("submit", register);
});
function register(event) {
  event.preventDefault();
  const formData = {
    username: registerForm.username.value.trim(),
    fullName: registerForm.fullname.value.trim(),
    password: registerForm.password.value.trim(),
  };
  console.log(formData.username);
  registerForm.submit.disabled = true;
  authService.register(formData);
}
