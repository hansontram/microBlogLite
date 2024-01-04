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

    // Clear the form after successful post
    postForm.reset();

    // Display an alert before redirecting
    const confirmRedirect = window.confirm("Post successful.");

    if (confirmRedirect) {
      // Redirect to the post page after user confirmation
      window.location.replace("../posts/posts.html");
    }
  } catch (error) {
    // Display error message
    postMessage.textContent = "Error creating post. Please try again.";
    postMessage.classList.add("error"); // Add error class for styling

    console.error("Error:", error);
  }
}
