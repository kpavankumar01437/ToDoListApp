document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
  let input = document.getElementById("taskInput");
  let value = input.value;

  if (value === "") {
    alert("Enter a task");
    return;
  }

  let li = document.createElement("li");
  li.textContent = value;

  // Toggle complete using CSS class
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveTasks();
  });

  let del = document.createElement("button");
  del.textContent = "Delete";
  del.className = "deleteBtn";

  del.addEventListener("click", function (event) {
    event.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(del);
  document.getElementById("taskList").appendChild(li);

  input.value = "";

  saveTasks();
}

// Save only data – no UI logic
function saveTasks() {
  let tasks = [];

  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks using HTML + CSS behavior
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTasks();
    });

    let del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "deleteBtn";

    del.addEventListener("click", function (event) {
      event.stopPropagation();
      li.remove();
      saveTasks();
    });

    li.appendChild(del);
    document.getElementById("taskList").appendChild(li);
  });
}

window.onload = loadTasks;
