require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/conn");

// const { Pool } = require("pg");

// const pool = new Pool({
//   database: "todolist",
// });

// const PORT = 4000;

app.use(express.json());
app.use(express.static("public"));

//get all tasks
app.get("/todos", (req, res) => {
  pool
    .query("SELECT * FROM todos ORDER BY id;")
    .then((result) => {
      res.send(result.rows);
    })
    .catch(() => {
      res.sendStatus(503);
    });
});

//post a task
app.post("/todos", (req, res) => {
  const { task_name, task_priority } = req.body;
  pool
    .query(
      "INSERT INTO todos(task_name, task_priority) VALUES($1,$2) RETURNING *;",
      [task_name, task_priority]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch(() => {
      res.sendStatus(503);
    });
});

//update a task
app.patch("/todos/:id", (req, res) => {
  const { task_name, task_priority } = req.body;
  const { id } = req.params;
  const query = `
    UPDATE todos SET 
    task_name = COALESCE($1, task_name),
    task_priority = COALESCE($2, task_priority)
    WHERE id=$3
    RETURNING *
    `;
  pool
    .query(query, [task_name, task_priority, id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch(() => {
      res.sendStatus(503);
    });
});

//delete a task
// app.delete("/todos/:id", (req, res) => {
//   const id = req.params.id;
//   pool
//     .query("DELETE FROM todos WHERE id=$1 RETURNING *;", [id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch(() => {
//       res.sendStatus(503);
//     });
// });

app.delete("/todos/:id", (req, res) => {
  // const { task_name, task_priority } = req.body;
  const id = req.params.id;
  pool
    .query(
      "DELETE FROM todos WHERE task_name=$1 AND task_priority = $2 RETURNING *;",
      [task_name, task_priority]
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch(() => {
      res.sendStatus(503);
    });
});

app.listen(process.env.PORT, () => {
  console.log("Listening to port: ", process.env.PORT);
});
