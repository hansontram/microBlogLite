class PostService extends ServicesBase {
  apiBaseUrl = "http://localhost:5000";

  constructor() {
    super();
    this.postUrl = this.apiBaseUrl + "/api/posts";
  }

  async post(authService, postData) {
    try {
      const authToken = authService.getLoginData().token;

      if (!authToken) {
        console.error("Authentication token is missing or invalid.");
        return Promise.reject("Authentication token is missing or invalid.");
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(postData),
      };

      const response = await fetch(this.postUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      // Do something with the responseData if needed
      console.log("Post response data:", responseData);

      return responseData;
    } catch (error) {
      console.error("Error during POST request:", error);
      throw error; // Re-throw the error to be caught by the calling code
    }
  }
  // async getAllPosts(){
  // return fetch(this.apiBaseUrl + "/api/posts").then((response) => response.json());
  // }

  async getAllPosts(authService) {
    try {
      const authToken = authService.getLoginData().token;

      if (!authToken) {
        console.error("Authentication token is missing or invalid.");
        return Promise.reject("Authentication token is missing or invalid.");
      }

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await fetch(this.apiBaseUrl + "/api/posts", options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error("Error during GET request:", error);
      throw error; // Re-throw the error to be caught by the calling code
    }
  }
}
