const listElement = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const clearButton = document.getElementById("clear-all");
let todos = [];

function updateTodoUI() {
  listElement.innerHTML = "";
  for (let todo of todos) {
    const span = document.createElement("span");
    span.innerText = todo.text;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.isCompleted;
    checkbox.dataset.todoId = todo.id;
    checkbox.classList.add("checkbox");

    const todoLiElement = document.createElement("li");
    if (todo.isCompleted) {
      todoLiElement.classList.add("checked");
    }

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.dataset.todoId = todo.id;

    todoLiElement.append(checkbox);
    todoLiElement.append(span);
    todoLiElement.append(removeButton);
    listElement.append(todoLiElement);
  }
}

listElement.addEventListener("click", (event) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.id == event.target.dataset.todoId
  );
  if (event.target.matches("input.checkbox")) {
    console.log(todoIndex);
    todos[todoIndex] = {
      ...todos[todoIndex],
      isCompleted: event.target.checked,
    };
    event.target.parentElement.classList.toggle("checked");
  } else if (event.target.matches("button")) {
    todos.splice(todoIndex, 1);
    updateTodoUI();
  }
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoInput = document.getElementById("todo-text");
  if (!todoInput.value) {
    alert("You can not add an empty TODO!");
    return;
  }
  todos.push({ id: Date.now(), text: todoInput.value, isCompleted: false });
  todoInput.value = "";
  updateTodoUI();
});

clearButton.addEventListener("click", (event) => {
  todos = [];
  updateTodoUI();
});
