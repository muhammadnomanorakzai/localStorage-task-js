// Check if the user is logged in, if not redirect to the login page
window.onload = function () {
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn) {
    window.location.href = "../index.html";
  }
};

// Get current user details from localStorage and display their full name or email
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("userName").textContent =
  currentUser.FullName || currentUser.Email;

// Logout function: Removes user data from localStorage and redirects to the login page
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("tasks");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userName");
  window.location.href = "../index.html";
}

// Add Task function: Adds a new task to the list stored in localStorage
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (!taskText) {
    Swal.fire({
      icon: "warning",
      title: "Empty Task!",
      text: "Please enter a task before submitting.",
      confirmButtonColor: "#6e8efb",
    });
    return;
  }

  // Create a new task object
  const newTask = {
    title: taskText,
    iscompleted: false,
    createdBy: {
      FullName: currentUser.FullName,
      email: currentUser.Email,
    },
  };

  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  allTasks.push(newTask); // Add the new task to the existing list
  localStorage.setItem("tasks", JSON.stringify(allTasks)); // Store updated task list

  Swal.fire({
    icon: "success",
    title: "Task Added!",
    text: "Your task has been saved successfully.",
    confirmButtonColor: "#6e8efb",
  });

  taskInput.value = ""; // Clear the input field
  showTasks(); // Refresh the displayed tasks
}

// Delete Task function: Removes a task from localStorage after user confirmation
function deleteTask(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "This task will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const userTasks = allTasks.filter(
        (task) => task.createdBy.email === currentUser.Email
      );
      const taskToDelete = userTasks[index];

      // Filter out the task to delete from the task list
      const updatedTasks = allTasks.filter(
        (task) =>
          !(
            task.title === taskToDelete.title &&
            task.createdBy.email === currentUser.Email
          )
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update the task list
      showTasks(); // Refresh the task display

      Swal.fire({
        title: "Deleted!",
        text: "Your task has been removed.",
        icon: "success",
        confirmButtonColor: "#6e8efb",
      });
    }
  });
}

// Edit Task function: Allows the user to edit an existing task
function editTask(index) {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const userTasks = allTasks.filter(
    (task) => task.createdBy.email === currentUser.Email
  );
  const taskToEdit = userTasks[index];

  Swal.fire({
    title: "Edit Task",
    input: "text",
    inputValue: taskToEdit.title,
    showCancelButton: true,
    confirmButtonText: "Save",
    confirmButtonColor: "#6e8efb",
  }).then((result) => {
    if (result.isConfirmed && result.value.trim() !== "") {
      const newTitle = result.value.trim();

      const targetIndex = allTasks.findIndex(
        (task) =>
          task.title === taskToEdit.title &&
          task.createdBy.email === currentUser.Email
      );

      if (targetIndex !== -1) {
        allTasks[targetIndex].title = newTitle; // Update the task title
        localStorage.setItem("tasks", JSON.stringify(allTasks)); // Store updated task list
        showTasks(); // Refresh the displayed tasks

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your task has been updated.",
          confirmButtonColor: "#6e8efb",
        });
      }
    }
  });
}

// Show Tasks function: Displays the user's tasks from localStorage
function showTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the task list

  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const userTasks = allTasks.filter(
    (task) => task.createdBy.email === currentUser.Email
  );

  // Display each task in the list
  userTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div class="d-flex align-items-center">
        <button class="btn btn-sm btn-outline-success me-2" onclick="markDone(${index})" title="Mark as Done">✔</button>
        <span class="task-title">${task.title}</span>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="editTask(${index})" title="Edit Task">✏️</button>
        <button class="delete-btn btn btn-sm btn-outline-danger" onclick="deleteTask(${index})" title="Delete Task">🗑️</button>
      </div>
    `;

    taskList.appendChild(li); // Add task to the list
  });
}

// Initial call to show the tasks when the page loads
showTasks();
