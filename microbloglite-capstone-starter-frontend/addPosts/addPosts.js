// document.addEventListener("DOMContentLoaded", () => {
//     authService = new AuthService();

//     const logoutLink = document.querySelector("#logout-link");
//     logoutLink.addEventListener("click", () => {
//       authService.logout();
//     });
//     // moved here from posts.html to avoid console error
//     if (authService.isLoggedIn() === false) {
//       window.location.replace("/");
//     }
//   });

"use strict";
let postService;
let postForm;

document.addEventListener("DOMContentLoaded", () => {
  authService = new AuthService();
  // Logout functionality
  const logoutLink = document.querySelector("#logout-link");
  logoutLink.addEventListener("click", () => {
    authService.logout();
  });

  if (authService.isLoggedIn() === false) {
    window.location.replace("/");
  }
  // Add Post functionality
  postService = new PostService();

  postForm = document.querySelector("#postForm");
  postForm.addEventListener("submit", post);
});

async function post(event) {
  event.preventDefault();

  const authService = new AuthService();

  const loginData = authService.getLoginData();
  const authToken = loginData.token;

  // Check if authToken is not undefined or null
  if (!authToken) {
    console.error("Authentication token is missing or invalid.");
    return;
  }

  const postData = {
    text: postForm.postContent.value,
  };
  // console.log(postData);

  try {
    // Call the post method with the AuthService instance and postData
    const result = await postService.post(authService, postData);

    // Handle the result as needed
    //   console.log("Post result:", result);
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
}
