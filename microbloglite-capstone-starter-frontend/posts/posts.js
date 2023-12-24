/* Posts Page JavaScript */

"use strict";


// let authService
// let logout

document.addEventListener("DOMContentLoaded", () => {
  authService = new AuthService();

  const logoutLink = document.querySelector("#logout-link");
  logoutLink.addEventListener("click", () => {
    authService.logout();
  });
  // moved here from posts.html to avoid console error
  if (authService.isLoggedIn() === false) {
    window.location.replace("/");
  }
});
