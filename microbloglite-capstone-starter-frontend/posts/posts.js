/* Posts Page JavaScript */

"use strict";

let postService

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
function loadAllPosts(authService, postService){
  postService.getAllPosts(authService)
  .then(posts => {displayPostDetails(posts) })
  .catch(error => {
    console.error("Error fetching posts:", error);
  });
}

function displayPostDetails(posts){
 
  const detailsContainer = document.getElementById("allPostsContainer");

  // TODO: add bootstrap class later 
  detailsContainer.classList.add("postContainer");
  detailsContainer.innerHTML = ""
  
 posts.forEach((post) => {
    displayPost(post, detailsContainer);
  });
}

function displayPost (post, detailsContainer){
  // Create a div for each park
  const postContainer = document.createElement("div");
  postContainer.classList.add("postContainer");

  detailsContainer.appendChild(postContainer);

  addUsername(post, detailsContainer);
  addDescription(post, detailsContainer);
}

function addUsername(posts, detailsContainer){
  const username = document.createElement("h4");
  username.classList.add("userName");
  username.innerText = `Username: ${posts.username}`;
  detailsContainer.appendChild(username);
} 

function addDescription(posts, detailsContainer){
  const description = document.createElement("h5");
  description.classList.add("description")
  description.innerText = `Description: ${posts.text}`;
  detailsContainer.appendChild(description)
} 