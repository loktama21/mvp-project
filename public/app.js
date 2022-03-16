const form = document.querySelector(".user-form");
const displayToDo = document.querySelector(".display"); //display

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const todo = {
    task_name: data.get("task"),
    task_priority: data.get("priority"),
  };

  let newTodo = document.createElement("li");
  newTodo.innerHTML = todo.task_name;
  displayToDo.appendChild(newTodo);

  fetch("/todos", {
    method: "post",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });

  newTodo.addEventListener("dblclick", (e) => {
    displayToDo.removeChild(newTodo);
    e.preventDefault();
    // const data = new FormData(e.target);
    const todo = {
      task_name: data.get("task"),
      task_priority: data.get("priority"),
    };

    //current working start
    fetch("/todos", {
      method: "delete",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //current working end
  });

  console.log("Saved");
});
