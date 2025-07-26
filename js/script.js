"use strict";

document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f4f4f4";
document.body.style.backgroundImage = "url('../images/back.jpg')";
document.body.style.backgroundSize = "cover";

const app = document.querySelector(".todo_app");
app.style.maxWidth = "600px";
app.style.margin = "50px auto";
app.style.padding = "20px";
app.style.backgroundColor = "#fff";
app.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const descInput = document.getElementById("desc-input");
const deadlineInput = document.getElementById("deadline-input");
const todoList = document.getElementById("todo-list");

document.addEventListener("DOMContentLoaded", loadTasks());

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  const desc = descInput.value.trim();
  const deadline = deadlineInput.value;

  if (task) {
    const taskObj = { task, desc, deadline };
    addTaskToDOM(taskObj);
    saveTaskToLocal(taskObj);
    todoInput.value = "";
    descInput.value = "";
    deadlineInput.value = "";
  }
});

function saveTaskToLocal(taskObj) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

function removeTaskFromLocal(taskText, descText, deadlineText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(
    t => !(t.task === taskText && t.desc === descText && t.deadline === deadlineText)
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM({ task, desc, deadline }) {
  const li = document.createElement("li");
  li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row");

  const textWrapper = document.createElement("div");
  textWrapper.setAttribute("class", "me-auto");

  const title = document.createElement("strong");
  title.innerText = task;
  textWrapper.appendChild(title);

  if (desc) {
    const description = document.createElement("p");
    description.innerText = desc;
    description.setAttribute("class", "mb-0 text-muted");
    textWrapper.appendChild(description);
  }

  if (deadline) {
    const deadlineEl = document.createElement("p");
    deadlineEl.innerText = "Deadline: " + deadline;
    deadlineEl.setAttribute("class", "mb-0 text-danger small");
    textWrapper.appendChild(deadlineEl);
  }

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.setAttribute("class", "btn btn-sm btn-danger mt-2 mt-md-0");
  delBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromLocal(task, desc, deadline);
  });

  li.appendChild(textWrapper);
  li.appendChild(delBtn);
  todoList.appendChild(li);
}
