const form = document.querySelector(".user-form")
const displayToDo = document.querySelector(".display") //display

fetch("/list", {
  method: "get",
})
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      let newTodo = document.createElement("li")
      newTodo.innerHTML = data[i].task_name
      displayToDo.appendChild(newTodo)
    }
  })

form.addEventListener("submit", (e) => {
  document.getElementsById("task").value = null // clear the input field
  e.preventDefault()
  const data = new FormData(e.target)
  const todo = {
    task_name: data.get("task"),
    task_priority: data.get("priority"),
  }
  let newTodo = document.createElement("li")
  newTodo.innerHTML = todo.task_name
  displayToDo.appendChild(newTodo)
  //document.getElementsById("task").value = null // clear the input field

  fetch("/todos", {
    method: "post",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(res)
    })
})

document.getElementsByTagName("li").addEventListener("dblclick", (e) => {
  displayToDo.removeChild(newTodo)
  e.preventDefault()
  // const data = new FormData(e.target);
  const todo = {
    task_name: data.get("task"),
    task_priority: data.get("priority"),
  }

  //current working start
  fetch("/todos", {
    method: "delete",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  })
  //current working end
})
