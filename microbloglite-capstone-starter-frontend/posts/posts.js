/* Posts Page JavaScript */

"use strict";

let postService;

document.addEventListener("DOMContentLoaded", () => {
  authService = new AuthService();
  postService = new PostService();

  loadAllPosts(authService, postService);

  const logoutLink = document.querySelector("#logout-link");
  logoutLink.addEventListener("click", () => {
    authService.logout();
  });
  // moved here from posts.html to avoid console error
  if (authService.isLoggedIn() === false) {
    window.location.replace("/");
  }
});
function loadAllPosts(authService, postService) {
  postService
    .getAllPosts(authService)
    .then((posts) => {
      displayPostDetails(posts);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function displayPostDetails(posts) {
  const detailsContainer = document.getElementById("allPostsContainer");

  detailsContainer.classList.add("postContainer");
  detailsContainer.innerHTML = "";

  posts.forEach((post) => {
    displayPost(post, detailsContainer);
  });
  displayGreeting(posts);
}
function displayGreeting(post) {
  const greetingContainer = document.getElementById("greetingContainer");
  const greeting = document.createElement("h4");
  greeting.classList.add("greeting");
  // Displays the last user who posted
  greeting.innerText = `Welcome back, ${post[0].username}!`;
  greetingContainer.appendChild(greeting);
}
function displayPost(post, detailsContainer) {
  // Create a div for each post
  const postContainer = document.createElement("div");
  postContainer.classList.add("postContainer");
  postContainer.classList.add("border", "border-primary");

  detailsContainer.appendChild(postContainer);

  addUsername(post, detailsContainer);
  addDescription(post, detailsContainer);
  addLikeButton(post, detailsContainer);
}

function addUsername(posts, detailsContainer) {
  const username = document.createElement("h4");
  username.classList.add("userName");
  username.innerText = `@${posts.username}`;
  detailsContainer.appendChild(username);
}

function addDescription(posts, detailsContainer) {
  const description = document.createElement("h5");
  description.classList.add("description");
  description.innerText = `${posts.text}`;
  detailsContainer.appendChild(description);
}
function addLikeButton(posts, detailsContainer) {
  const likeButton = document.createElement("button");
  likeButton.setAttribute("id", posts._id);
  likeButton.classList.add("like");
  likeButton.innerText = `❤️`;

  likeButton.addEventListener("click", () => {
    console.log("Button " + posts._id + " Clicked");
    // console.log(authService, postService);
    // handleLikeButtonClick(posts, authService, postService);
    handleLikeButtonClick(posts);
  });

  detailsContainer.appendChild(likeButton);

  const displayLikes = document.createElement("span");
  displayLikes.classList.add("like");
  displayLikes.innerText = `${posts.likes.length}`;
  detailsContainer.appendChild(displayLikes);
}

async function handleLikeButtonClick(posts) {
  const authService = new AuthService();
  const postService = new PostService();

  const loginData = authService.getLoginData();
  const authToken = loginData.token;

  // Check if authToken is not undefined or null
  if (!authToken) {
    console.error("Authentication token is missing or invalid.");
    return;
  }

  const postData = {
    postId: posts._id,
  };
  console.log(postData, authToken);

  try {
    // Call the post method with the AuthService instance and postData
    const result = await postService.addPostLike(postData, authToken);
    console.log("await works");

    window.location.reload();
  } catch (error) {
    // Display error message
    postMessage.textContent = "Error like post. Please try again.";
    postMessage.classList.add("error"); // Add error class for styling

    console.error("Error:", error);
  }
}
