// Check if the user is logged in. If not, redirect to the home page
window.onload = function () {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn) {
    window.location.href = "./home.html";
  }
};

// Register function: Handles the user registration process
function register(e) {
  e.preventDefault(); // Prevents the default form submission behavior

  const FullName = document.getElementById("FullName").value.trim(); // Get the entered full name
  const Email = document.getElementById("Email").value.trim(); // Get the entered email
  const password = document.getElementById("password").value; // Get the entered password

  const newUser = { FullName, Email, password }; // Create a new user object

  // Retrieve existing users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user with the same email already exists
  const userExists = existingUsers.some((user) => user.Email === Email);

  // If the user already exists, show an error message
  if (userExists) {
    Swal.fire({
      icon: "error",
      title: "Registration Failed!",
      text: "User with this email already exists.",
      confirmButtonColor: "#6e8efb", // Set button color
    });
    return; // Stop execution if the user exists
  }

  // Add the new user to the existing users array
  existingUsers.push(newUser);
  // Save the updated users list to localStorage
  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Show a success message
  Swal.fire({
    icon: "success",
    title: "Registered Successfully!",
    text: "You can now login with your credentials.",
    confirmButtonColor: "#6e8efb", // Set button color
  }).then(() => {
    // Redirect to the login page after successful registration
    window.location.href = "../index.html";
  });
}
