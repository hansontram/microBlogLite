/* Landing Page JavaScript */

"use strict";

let authService
let loginForm;

document.addEventListener("DOMContentLoaded", () => {
  authService = new AuthService();

  // ** Not needed for now **
//   if (authService.isLoggedIn()) {
//     window.location.replace("/posts/posts.html");
//   }

// TODO: error in console says loginForm = null but login works
  loginForm = document.querySelector("#login");
  console.log(loginForm)
  loginForm.addEventListener("submit", login);

});


function login(event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();

  // We can use loginForm.username (for example) to access
  // the input element in the form which has the ID of "username".
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };
  console.log(loginData);
  // Disables the button after the form has been submitted already:
  loginForm.loginButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  authService.login(loginData);
}
