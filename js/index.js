// Check if the user is logged in, if logged in redirect to home page

window.onload = function () {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn) {
    window.location.href = "./home.html";
  }
};

// If the user is already logged in, redirect to the home page
if (localStorage.getItem("loggedIn") === "true") {
  window.location.href = "./html/home.html";
}

// Login function: Verifies user credentials and logs them in if valid
function login(e) {
  e.preventDefault(); // Prevents the default form submission behavior

  const Email = document.getElementById("Email").value; // Get the entered email
  const password = document.getElementById("password").value; // Get the entered password

  // Retrieve the users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Search for a matching user based on the entered email and password
  const matchedUser = users.find(
    (user) => user.Email === Email && user.password === password
  );

  // If a matching user is found, log them in
  if (matchedUser) {
    localStorage.setItem("loggedIn", "true"); // Set user as logged in in localStorage
    localStorage.setItem("currentUser", JSON.stringify(matchedUser)); // Save the current user to localStorage
    localStorage.setItem("userName", matchedUser.FullName); // Save the user's full name to localStorage

    // Show a success alert with a custom message and animation
    Swal.fire({
      icon: "success",
      title: "Great!",
      html: "<b>Congratulations! You have successfully logged in.</b>",
      showClass: {
        popup: "animate__animated animate__fadeInDown", // Animation when alert appears
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp", // Animation when alert disappears
      },
      background: "#f0fff0", // Set alert background color
      confirmButtonColor: "#00c851", // Set confirm button color
    }).then(() => {
      // Redirect to the home page after successful login
      window.location.href = "./html/home.html";
    });
  } else {
    // If the user is not found or the credentials are incorrect, show an error alert
    Swal.fire({
      icon: "error",
      title: "Login Failed!",
      text: "Invalid credentials or user not found. Please register.",
      confirmButtonColor: "#d33", // Set the confirm button color
    }).then(() => {
      // Redirect to the registration page if login failed
      window.location.href = "./html/register.html";
    });
  }
}
