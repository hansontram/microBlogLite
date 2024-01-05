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
  const detailsDiv = document.getElementById("allPostsContainer");
  detailsDiv.classList.add("container", "m-5");
  detailsDiv.innerHTML = "";

  posts.forEach((post) => {
    displayPost(post, detailsDiv);
  });
  displayGreeting(posts);
}
function displayGreeting(post) {
  const greetingContainer = document.getElementById("greetingContainer");
  const greeting = document.createElement("h2");
  greeting.classList.add("m-5", "container");
  // Displays the last user who posted

  const usernameData = localStorage.getItem("login-data");
  const loginDataObj = JSON.parse(usernameData);
  const username = loginDataObj.username;
  greeting.innerText = `Welcome to the Gitpost'n party, ${username}!`;
  greetingContainer.appendChild(greeting);
}
function displayPost(post, detailsDiv) {
  const postContainer = document.createElement("div");
  postContainer.classList.add(
    "p-4",
    "m-1",
    "mb-4",
    "border",
    "border-5",
    "card"
  );

  postContainer.classList.add(
    detailsDiv.children.length % 2 === 0 ? "border-primary" : "border-secondary"
  );
  postContainer.classList.add(
    detailsDiv.children.length % 2 === 0 ? "bg-warning" : "bg-warning"
  );

  detailsDiv.appendChild(postContainer);

  addUsername(post, postContainer);
  addDescription(post, postContainer, detailsDiv);
  addLikeButton(post, postContainer);
  addDate(post, postContainer);
}

function addUsername(posts, postContainer) {
  const username = document.createElement("h4");
  username.classList.add("card-title", "text-light");
  username.innerText = `@${posts.username}`;
  postContainer.appendChild(username);
}

function addDescription(posts, postContainer, detailsDiv) {
  const description = document.createElement("h5");
  description.classList.add("m-2", "card-text");
  description.classList.add(
    detailsDiv.children.length % 2 === 0 ? "text-dark" : "text-dark"
  );

  description.innerText = `${posts.text}`;
  postContainer.appendChild(description);
}

function addLikeButton(posts, postContainer) {
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  postContainer.appendChild(cardBody);

  const likeButton = document.createElement("button");
  likeButton.setAttribute("id", posts._id);
  likeButton.classList.add("btn");
  likeButton.innerText = `❤️`;

  likeButton.addEventListener("click", () => {
    console.log("Button " + posts._id + " Clicked");
    handleLikeButtonClick(posts);
  });

  cardBody.appendChild(likeButton);

  const displayLikes = document.createElement("span");
  displayLikes.classList.add("text-dark");
  displayLikes.innerText = `${posts.likes.length}`;
  cardBody.appendChild(displayLikes);
}

function addDate(posts, postContainer) {
  const createdAtDate = new Date(posts.createdAt);
  const now = new Date();
  const timeDifference = now - createdAtDate;

  // Calculate the time difference in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let formattedDate;

  if (days > 0) {
    formattedDate = `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    formattedDate = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    formattedDate = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    formattedDate = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const footer = document.createElement("div");
  footer.classList.add("card-footer", "text-dark");
  footer.innerText = formattedDate;
  postContainer.appendChild(footer);
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
    postMessage.classList.add("error"); 

    console.error("Error:", error);
  }
}
