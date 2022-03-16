const form = document.querySelector(".user-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const todo = {
    task_name: data.get("task"),
    task_priority: data.get("priority"),
  };

  fetch("/todos", {
    method: "post",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Saved");
});
