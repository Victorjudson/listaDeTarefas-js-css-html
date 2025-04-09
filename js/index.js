const form = document.querySelector("#todo-form");
const inputTesk = document.querySelector("#input-tesk");
const button = document.querySelector("#button");
const todoList = document.querySelector("#todo-list");

let tasks = [];

function renderTasksOnHtml(textValue, done = false) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;
    const spanliToToggle = liToToggle.querySelector("span");

    if (event.target.checked) {
      spanliToToggle.style.textDecoration = "line-through";
    } else {
      spanliToToggle.style.textDecoration = "none";
    }
    tasks = tasks.map((t) => {
      if (t.title === spanliToToggle.textContent) {
        return { title: t.title, done: event.target.checked };
      }
      return t;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  input.checked = done;

  const totalTarefas = todoList.children.length;
  if (totalTarefas >= 9) {
    alert("Limite de tarefas atingido!");
    return;
  }

  const span = document.createElement("span");
  span.textContent = textValue;
  if (done) {
    span.style.textDecoration = "line-through";
  }

  const buttonList = document.createElement("button");
  buttonList.textContent = "Remover";
  buttonList.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    const titleRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleRemove);
    todoList.removeChild(liToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(buttonList);

  todoList.appendChild(li);
}

window.onload = () => {
  const tasksLocalStorage = localStorage.getItem("tasks");

  if (!tasksLocalStorage) return;
  tasks = JSON.parse(tasksLocalStorage);
  tasks.forEach((t) => {
    renderTasksOnHtml(t.title, t.done);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textValue = inputTesk.value.trim();

  if (textValue.length < 3) {
    alert("Please enter at least 3 characters.");
    return;
  }

  tasks.push({
    title: textValue,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasksOnHtml(textValue);
});
